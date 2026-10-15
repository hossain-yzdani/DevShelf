import { Bot, InlineKeyboard, InputFile } from "grammy";
import { logger } from "../utils/logger";
import { ResourceService } from "../services/resource.service";
import {
  Resource,
  ResourceType,
} from "../../../../packages/types/resource.type";
import { Readable } from "node:stream";
import { FileService } from "../services/file.service";
import { buildResourceKeyboard } from "../keyboards/resource.keyboard";
import { FavoriteService } from "../services/favorite.service";

const ITEMS_PER_PAGE = 5;

export function registerResourceCallbacks(bot: Bot) {
  bot.callbackQuery("resources", async (ctx) => {
    await ctx.answerCallbackQuery();
    await showResourcesPage(ctx, 1);
  });

  bot.callbackQuery(/^resources_page_(\d+)$/, async (ctx) => {
    const page = parseInt(ctx.match[1], 10);
    await ctx.answerCallbackQuery();
    await showResourcesPage(ctx, page);
  });

  bot.callbackQuery(/^view_(.+)$/, async (ctx) => {
    const slug = ctx.match[1];
    const telegramId = ctx.from?.id;

    const isFavorited = await FavoriteService.isFavorited(slug, telegramId);

    try {
      const resource = await ResourceService.getBySlug(slug);
      if (!resource) {
        await ctx.answerCallbackQuery("❌ Resource not found!");
        return;
      }

      const message = formatResourceMessage(resource);
      const keyboard = buildResourceKeyboard(slug, isFavorited);

      if (resource.posterUrl) {
        await ctx.replyWithPhoto(resource.posterUrl, {
          caption: message,
          reply_markup: keyboard,
          parse_mode: "HTML",
        });
        await ctx.deleteMessage();
      } else {
        await ctx.editMessageText(message, {
          reply_markup: keyboard,
          parse_mode: "HTML",
        });
      }
    } catch (error) {
      logger.error({ slug, error }, "Failed to show resource");
      await ctx.answerCallbackQuery("❌ Failed to load resource!");
    }
  });

  bot.callbackQuery(/^download_(.+)$/, async (ctx) => {
    const slug = ctx.match[1];
    const telegramId = ctx.from?.id;

    try {
      await ctx.answerCallbackQuery("⏳ Preparing file...");

      const resource = await ResourceService.getBySlug(slug);
      if (!resource || !resource.fileUrl) {
        await ctx.answerCallbackQuery("❌ File not available!");
        return;
      }

      logger.info({ fileUrl: resource.fileUrl }, "🔍 Downloading from URL");

      await ctx.replyWithChatAction("upload_document");

      const fileName =
        resource.fileUrl.split("/").pop() || `${resource.slug}.pdf`;
      const fileBuffer = await FileService.downloadFile(telegramId, resource);
      const inputFile = new InputFile(fileBuffer, fileName);

      logger.info(
        {
          streamType: fileBuffer.constructor.name,
          isReadable: fileBuffer instanceof Readable,
          fileName,
          fileUrl: resource.fileUrl,
        },
        "File ready to send",
      );

      await ctx.replyWithDocument(inputFile, {
        caption: `📄 <b>${resource.name}</b>\n✍️ ${resource.author}\n📂 ${resource.category?.name || ""}`,
        parse_mode: "HTML",
      });

      logger.info({ telegramId, slug }, "📥 File sent successfully");
      await ctx.answerCallbackQuery("✅ File sent!");
    } catch (error: any) {
      console.dir(error, { depth: null });
      logger.error(
        {
          slug,
          telegramId,
          error,
          message: error?.message,
          description: error?.description,
          method: error?.method,
          payload: error?.payload,
          cause: error?.cause,
        },
        "Download failed",
      );

      try {
        const resource = await ResourceService.getBySlug(slug);
        await ctx.reply(
          `⚠️ <b>Could not send file directly</b>\n\n` +
            `📄 <b>${resource.name}</b>\n` +
            `✍️ ${resource.author}\n\n` +
            `🔗 <a href="${resource.fileUrl}">Click here to download</a>`,
          { parse_mode: "HTML" },
        );
        await ctx.answerCallbackQuery("⚠️ Link sent instead");
      } catch (_) {
        await ctx.answerCallbackQuery("❌ Download failed!");
      }
    }
  });

  bot.callbackQuery(/^favorite_(.+)$/, async (ctx) => {
    const slug = ctx.match[1];
    const telegramId = ctx.from?.id;

    try {
      await ctx.answerCallbackQuery("⏳ Updating favorites...");

      const result = await FavoriteService.toggleFavorite(slug, telegramId);

      await ctx.answerCallbackQuery(
        result.isFavorited
          ? "❤️ Added to favorites!"
          : "💔 Removed from favorites!",
      );

      const [resource, isFavorited] = await Promise.all([
        ResourceService.getBySlug(slug),
        FavoriteService.isFavorited(slug, telegramId),
      ]);

      const newMessage = formatResourceMessage(resource);
      const newKeyboard = buildResourceKeyboard(slug, isFavorited);

      if (ctx.callbackQuery.message?.photo) {
        await ctx.editMessageCaption({
          caption: newMessage,
          reply_markup: newKeyboard,
          parse_mode: "HTML",
        });
      } else {
        await ctx.editMessageText(newMessage, {
          reply_markup: newKeyboard,
          parse_mode: "HTML",
        });
      }

      logger.info(
        { telegramId, slug, isFavorited: result.isFavorited },
        "❤️ Favorite toggled",
      );
    } catch (error: any) {
      if (error.description?.includes("message is not modified")) {
        logger.info({ telegramId, slug }, "ℹ️ Message already up to date");
        return;
      }
      logger.error({ slug, telegramId, error }, "Failed to toggle favorite");
      await ctx.answerCallbackQuery("❌ Failed to update favorites!");
    }
  });
}

function formatResourceMessage(resource: Resource): string {
  const typeEmojis: Record<ResourceType, string> = {
    book: "📚",
    video: "🎬",
    article: "📄",
    audio: "🎧",
    course: "🎓",
  };

  const typeLabels: Record<ResourceType, string> = {
    book: "Book",
    video: "Video",
    article: "Article",
    audio: "Audio",
    course: "Course",
  };

  const type = resource.type as ResourceType;
  const emoji = typeEmojis[type] || "📄";
  const label = typeLabels[type] || "Resource";

  return (
    `<b>${emoji} ${resource.name}</b>\n\n` +
    `📝 <b>Description:</b>\n${resource.description}\n\n` +
    `✍️ <b>Author:</b> ${resource.author}\n` +
    `📂 <b>Category:</b> ${resource.category?.name || "Unknown"}\n` +
    `🏷️ <b>Tags:</b> ${resource.tags?.map((t) => `#${t.name}`).join(" ") || "None"}\n\n` +
    `📊 <b>Statistics:</b>\n` +
    `❤️ ${resource.favoritesCount} favorites\n` +
    `📥 ${resource.downloadsCount} downloads\n\n` +
    `📌 <b>Type:</b> ${label}\n` +
    `📅 <b>Added:</b> ${new Date(resource.createdAt).toLocaleDateString("en-US")}`
  );
}

async function showResourcesPage(ctx: any, page: number = 1) {
  try {
    const { data: resources, meta } = await ResourceService.fetchResources(
      page,
      ITEMS_PER_PAGE,
    );

    if (!resources || resources.length === 0) {
      const emptyKeyboard = new InlineKeyboard();

      emptyKeyboard.text("🔙 Back to Main Menu", "back_main");

      if (ctx.callbackQuery) {
        await ctx.editMessageText(
          "📭 <b>No resources found</b>\n\nThere are no resources to display at the moment.",
          {
            reply_markup: emptyKeyboard,
            parse_mode: "HTML",
          },
        );
      } else {
        await ctx.reply(
          "📭 <b>No resources found</b>\n\nThere are no resources to display at the moment.",
          {
            reply_markup: emptyKeyboard,
            parse_mode: "HTML",
          },
        );
      }
      return;
    }

    const message = formatResourceList(resources, page, meta.total);
    const keyboard = buildResourceListKeyboard(
      resources,
      page,
      meta.totalPages,
    );

    if (ctx.callbackQuery) {
      await ctx.editMessageText(message, {
        parse_mode: "HTML",
        reply_markup: keyboard,
      });
    } else {
      await ctx.reply(message, {
        parse_mode: "HTML",
        reply_markup: keyboard,
      });
    }
  } catch (error) {
    logger.error({ page, error }, "Failed to show resources list");
    await ctx.reply("❌ Failed to load resources. Please try again.");
  }
}

function formatResourceList(
  resources: Resource[],
  page: number,
  total: number,
): string {
  let message = `📚 <b>Resources Library</b>\n`;
  message += `📊 <b>Total:</b> ${total} resources\n`;
  message += `📄 <b>Page:</b> ${page}\n\n`;

  resources.forEach((resource, index) => {
    const number = (page - 1) * ITEMS_PER_PAGE + index + 1;
    const emoji = getTypeEmoji(resource.type);

    message += `<b>${number}.</b> ${emoji} <b>${resource.name}</b>\n`;
    message += `     ✍️ ${resource.author}\n`;
    message += `     📥 ${resource.downloadsCount} | ❤️ ${resource.favoritesCount}\n\n`;
  });

  return message;
}

function buildResourceListKeyboard(
  resources: Resource[],
  currentPage: number,
  totalPages: number,
): InlineKeyboard {
  const keyboard = new InlineKeyboard();

  resources.forEach((resource, index) => {
    const number = (currentPage - 1) * ITEMS_PER_PAGE + index + 1;
    const emoji = getTypeEmoji(resource.type);
    const maxLength = 28;
    const displayName =
      resource.name.length > maxLength
        ? resource.name.substring(0, maxLength) + "…"
        : resource.name;

    keyboard
      .text(`${number}. ${emoji} ${displayName}`, `view_${resource.slug}`)
      .row();
  });

  if (currentPage > 1) {
    keyboard.text("⬅️ Prev", `resources_page_${currentPage - 1}`);
  } else {
    keyboard.text(" ", "noop");
  }

  keyboard.text(`📄 ${currentPage} / ${totalPages}`, "noop");

  if (currentPage < totalPages) {
    keyboard.text("Next ➡️", `resources_page_${currentPage + 1}`);
  } else {
    keyboard.text(" ", "noop");
  }

  keyboard.row();
  keyboard.text("🔙 Back to Main Menu", "back");

  return keyboard;
}

function getTypeEmoji(type: string): string {
  const emojis: Record<string, string> = {
    book: "📚",
    video: "🎬",
    article: "📄",
    audio: "🎧",
    course: "🎓",
  };
  return emojis[type] || "📄";
}
