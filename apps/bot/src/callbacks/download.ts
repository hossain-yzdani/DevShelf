import { Bot, InlineKeyboard } from "grammy";
import { DownloadService } from "../services/downloads.service";
import { logger } from "../utils/logger";
import { backKeyboard } from "../keyboards/main.keyboard";

export function registerDownloadCallbacks(bot: Bot) {
  bot.callbackQuery("myDownloads", async (ctx) => {
    const telegramId = ctx.from?.id;

    if (!telegramId) {
      await ctx.answerCallbackQuery("⚠️ User ID not found!");
      return;
    }

    try {
      await ctx.answerCallbackQuery("⏳ Loading downloads...");

      const downloads = await DownloadService.getUserDownloads(telegramId);

      if (!downloads || downloads.length === 0) {
        await ctx.editMessageText(
          "📥 **Your Downloads**\n\nYou haven't downloaded any resources yet.\n\n" +
            "Browse resources and click the 📥 button to download!",
          {
            reply_markup: backKeyboard,
            parse_mode: "Markdown",
          },
        );
        return;
      }

      const keyboard = new InlineKeyboard();

      for (const download of downloads.slice(0, 10)) {
        const resource = download.resource || download;
        keyboard.text(`✅ ${resource.name}`, `view_${resource.slug}`).row();
      }

      if (downloads.length > 10) {
        keyboard
          .text(
            `📄 Show more (${downloads.length - 10} more)`,
            `downloads_page_2`,
          )
          .row();
      }

      keyboard.text("↩️ Back", "back");

      await ctx.editMessageText(
        `📥 **Your Downloads**\n\n` +
          `You have downloaded ${downloads.length} resource${downloads.length > 1 ? "s" : ""}:\n\n` +
          `📌 Click on any resource to view details.`,
        {
          reply_markup: keyboard,
          parse_mode: "Markdown",
        },
      );

      logger.info(
        { telegramId, count: downloads.length },
        "📥 Downloads loaded",
      );
    } catch (error) {
      logger.error({ telegramId, error }, "Failed to load downloads");
      await ctx.editMessageText(
        "❌ **Error**\n\nFailed to load your downloads. Please try again later.",
        {
          reply_markup: backKeyboard,
          parse_mode: "Markdown",
        },
      );
      await ctx.answerCallbackQuery("❌ Failed to load downloads!");
    }
  });

  bot.callbackQuery(/^downloads_page_(.+)$/, async (ctx) => {
    const telegramId = ctx.from?.id;
    const page = parseInt(ctx.match[1], 10);

    if (!telegramId) return;

    try {
      const downloads = await DownloadService.getUserDownloads(telegramId);

      if (!downloads || downloads.length === 0) {
        await ctx.answerCallbackQuery("No downloads found!");
        return;
      }

      const itemsPerPage = 5;
      const totalPages = Math.ceil(downloads.length / itemsPerPage);
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const pageItems = downloads.slice(startIndex, endIndex);

      const keyboard = new InlineKeyboard();

      for (const download of pageItems) {
        const resource = download.resource || download;
        keyboard.text(`📌 ${resource.name}`, `view_${resource.slug}`).row();
      }

      const navRow = [];
      if (page > 1) {
        navRow.push({
          text: "⬅️ Previous",
          callback_data: `downloads_page_${page - 1}`,
        });
      }
      navRow.push({ text: `📄 ${page}/${totalPages}`, callback_data: "noop" });
      if (page < totalPages) {
        navRow.push({
          text: "Next ➡️",
          callback_data: `downloads_page_${page + 1}`,
        });
      }

      if (navRow.length > 0) {
        keyboard.row();
        for (const btn of navRow) {
          keyboard.text(btn.text, btn.callback_data);
        }
      }

      keyboard.row().text("↩️ Back", "back");

      await ctx.editMessageText(
        `📥 **Your Downloads** (Page ${page}/${totalPages})\n\n` +
          `Showing ${startIndex + 1}-${Math.min(endIndex, downloads.length)} of ${downloads.length} downloads:\n\n` +
          `📌 Click on any resource to view details.`,
        {
          reply_markup: keyboard,
          parse_mode: "Markdown",
        },
      );

      await ctx.answerCallbackQuery(`📄 Page ${page}`);
    } catch (error) {
      logger.error({ telegramId, error }, "Failed to load downloads page");
      await ctx.answerCallbackQuery("❌ Failed to load page!");
    }
  });

  // bot.callbackQuery(/^delete_download_(.+)$/, async (ctx) => {
  //   const slug = ctx.match[1];
  //   const telegramId = ctx.from?.id;

  //   if (!telegramId) {
  //     await ctx.answerCallbackQuery("⚠️ User ID not found!");
  //     return;
  //   }

  //   try {
  //     await ctx.answerCallbackQuery("🗑️ Download removed!");

  //     await ctx.callbackQuery("myDownloads");
  //   } catch (error) {
  //     logger.error({ slug, telegramId, error }, "Failed to delete download");
  //     await ctx.answerCallbackQuery("❌ Failed to delete!");
  //   }
  // });
}
