import { Bot, InlineKeyboard } from "grammy";
import { ResourceService } from "../services/resource.service";
import { backKeyboard } from "../keyboards/main.keyboard";
import { logger } from "../utils/logger";
import { Resource } from "../../../../packages/types/resource.type";

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

      resources.forEach((resource, index) => {
        const maxLength = 28;
        const displayName =
          resource.name.length > maxLength
            ? resource.name.substring(0, maxLength) + "…"
            : resource.name;

        keyboard
          .text(`${displayName}`, `view_${resource.slug}`)
          .success()
          .row();
      });

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
