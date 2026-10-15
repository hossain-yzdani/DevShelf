import { Bot, InlineKeyboard } from "grammy";
import { TagService } from "../services/tag.service";
import { backKeyboard } from "../keyboards/main.keyboard";

export function registerTagCallbacks(bot: Bot) {
  bot.callbackQuery("tags", async (ctx) => {
    await ctx.answerCallbackQuery();
    await showTagsPage(ctx, 1);
  });

  bot.callbackQuery(/^tags_page_(\d+)$/, async (ctx) => {
    const page = parseInt(ctx.match[1], 10);
    await ctx.answerCallbackQuery();
    await showTagsPage(ctx, page);
  });

  bot.callbackQuery(/^tag_(.+)$/, async (ctx) => {
    const tagSlug = ctx.match[1];
    try {
      const resources = await TagService.getResourcesByTag(tagSlug);

      if (!resources || resources.length === 0) {
        await ctx.editMessageText(
          "🏷️ **Tag Resources**\n\n" +
            "No resources found with this tag.\n\n" +
            "💡 Try browsing other tags or check back later.",
          {
            reply_markup: backKeyboard,
            parse_mode: "Markdown",
          },
        );
        return;
      }

      const keyboard = new InlineKeyboard();

      for (const resource of resources.slice(0, 10)) {
        keyboard
          .text(`📌 ${resource.name}`, `view_${resource.slug}`)
          .primary()
          .row();
      }

      keyboard.row();
      keyboard.text("↩️ Back", "back");

      await ctx.editMessageText(
        `🏷️ **Tag Resources**\n\n` +
          `📊 Showing ${Math.min(resources.length, 10)} of ${resources.length} resources.\n\n` +
          `Click on any resource below to view details.\n` +
          `Each resource includes description, author, and download option.`,
        {
          reply_markup: keyboard,
          parse_mode: "Markdown",
        },
      );
    } catch (error) {
      await ctx.editMessageText(
        "❌ **Error**\n\n" +
          "Failed to load resources.\n\n" +
          "💡 Please try again later.",
        {
          reply_markup: backKeyboard,
          parse_mode: "Markdown",
        },
      );
    }
  });
}

export async function showTagsPage(ctx: any, page: number = 1) {
  try {
    const tags = await TagService.fetchTags(page, 10);

    if (!tags || tags.data.length === 0) {
      await ctx.editMessageText(
        "🏷️ **Tags**\n\nNo tags found.\n\n" +
          "💡 Please check back later or contact support.",
        {
          reply_markup: backKeyboard,
          parse_mode: "Markdown",
        },
      );
      return;
    }

    const keyboard = new InlineKeyboard();

    for (let i = 0; i < tags.data.length; i += 2) {
      const tag1 = tags.data[i];
      const tag2 = tags.data[i + 1];

      if (tag2) {
        keyboard
          .text(`#${tag1.name}`, `tag_${tag1.slug}`)
          .success()
          .text(`#${tag2.name}`, `tag_${tag2.slug}`)
          .success()
          .row();
      } else {
        keyboard.text(`#${tag1.name}`, `tag_${tag1.slug}`).success().row();
      }
    }

    const { totalPages } = tags.meta;

    if (page > 1) {
      keyboard.text("⬅️ Prev", `resources_page_${page - 1}`);
    } else {
      keyboard.text(" ", "noop");
    }

    keyboard.text(`📄 ${page} / ${totalPages}`, "noop");

    if (page < totalPages) {
      keyboard.text("Next ➡️", `resources_page_${page + 1}`);
    } else {
      keyboard.text(" ", "noop");
    }

    keyboard.row();
    keyboard.text("↩️ Back", "back");

    await ctx.editMessageText(
      `🏷️ **Tags**\n\n` +
        `📊 Total: ${tags.data.length} tags available.\n\n` +
        `Browse through our collection by selecting a tag below.\n` +
        `Each tag contains curated resources for you.`,
      {
        reply_markup: keyboard,
        parse_mode: "Markdown",
      },
    );
  } catch (error) {
    await ctx.editMessageText(
      "❌ **Error**\n\n" +
        "Failed to load tags. Please try again later.\n\n" +
        "💡 If the problem persists, contact support.",
      {
        reply_markup: backKeyboard,
        parse_mode: "Markdown",
      },
    );
  }
}
