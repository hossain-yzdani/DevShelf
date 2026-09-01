import { Bot, InlineKeyboard } from "grammy";
import { ResourceService } from "../services/resource.service";
import { backKeyboard } from "../keyboards/main.keyboard";
import { logger } from "../utils/logger";

export function registerPopularCallbacks(bot: Bot) {
  bot.callbackQuery("popular", async (ctx) => {
    try {
      await ctx.answerCallbackQuery("⏳ Loading popular resources...");

      const resources = await ResourceService.getPopular(10);

      if (!resources || resources.length === 0) {
        await ctx.editMessageText(
          "⭐ **Popular Resources**\n\n" +
            "No popular resources found at the moment.\n\n" +
            "💡 Check back later or explore categories and tags!",
          {
            reply_markup: backKeyboard,
            parse_mode: "Markdown",
          },
        );
        return;
      }

      const keyboard = new InlineKeyboard();

      for (let i = 0; i < resources.length; i += 2) {
        const res1 = resources[i];
        const res2 = resources[i + 1];

        if (res2) {
          keyboard
            .text(`⭐ ${res1.name}`, `view_${res1.slug}`)
            .primary()
            .text(`⭐ ${res2.name}`, `view_${res2.slug}`)
            .primary()
            .row();
        } else {
          keyboard.text(`⭐ ${res1.name}`, `view_${res1.slug}`).primary().row();
        }
      }

      keyboard.text("↩️ Back", "back");

      await ctx.editMessageText(
        `⭐ **Popular Resources**\n\n` +
          `📊 Showing top ${resources.length} most favorited resources.\n\n` +
          `These resources are loved by our community!\n` +
          `Click on any resource below to view details.`,
        {
          reply_markup: keyboard,
          parse_mode: "Markdown",
        },
      );

      logger.info({ count: resources.length }, "⭐ Popular resources loaded");
    } catch (error) {
      logger.error({ error }, "Failed to load popular resources");

      await ctx.editMessageText(
        "❌ **Error**\n\n" +
          "Failed to load popular resources.\n\n" +
          "💡 Please try again later.",
        {
          reply_markup: backKeyboard,
          parse_mode: "Markdown",
        },
      );
      await ctx.answerCallbackQuery("❌ Failed to load popular resources!");
    }
  });
}
