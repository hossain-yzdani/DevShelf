import { Bot, InlineKeyboard } from "grammy";
import { FavoriteService } from "../services/favorite.service";
import { logger } from "../utils/logger";
import { backKeyboard } from "../keyboards/main.keyboard";
import { Resource } from "../types/resource.type";

export function registerFavoriteCallbacks(bot: Bot) {
  bot.callbackQuery("myFavorites", async (ctx) => {
    const telegramId = ctx.from?.id;

    if (!telegramId) {
      await ctx.answerCallbackQuery("⚠️ User ID not found!");
      return;
    }

    try {
      await ctx.answerCallbackQuery("⏳ Loading favorites...");

      const favorites =
        await FavoriteService.getFavorites(telegramId);
      
      if (!favorites || favorites.length === 0) {
        await ctx.editMessageText(
          "❤️ **Your Favorites**\n\nYou haven't added any favorites yet.\n\n" +
            "Browse resources and click the ❤️ button to save them!",
          {
            reply_markup: backKeyboard,
            parse_mode: "Markdown",
          },
        );
        return;
      }

      const keyboard = new InlineKeyboard();

      for (const fav of favorites.slice(0, 10)) {
        const resource: Resource = fav.resource;
        keyboard.text(`❤️ ${resource.name}`, `view_${resource.slug}`).row();
      }

      if (favorites.length > 10) {
        keyboard
          .text(
            `📄 Show more (${favorites.length - 10} more)`,
            `favorites_page_2`,
          )
          .row();
      }

      keyboard.text("↩️ Back", "back");

      await ctx.editMessageText(
        `❤️ **Your Favorites**\n\n` +
          `You have ${favorites.length} favorite resource${favorites.length > 1 ? "s" : ""}:\n\n` +
          `📌 Click on any resource to view details.`,
        {
          reply_markup: keyboard,
          parse_mode: "Markdown",
        },
      );

      logger.info(
        { telegramId, count: favorites.length },
        "❤️ Favorites loaded",
      );
    } catch (error) {
      logger.error({ telegramId, error }, "Failed to load favorites");
      await ctx.editMessageText(
        "❌ **Error**\n\nFailed to load your favorites. Please try again later.",
        {
          reply_markup: backKeyboard,
          parse_mode: "Markdown",
        },
      );
      await ctx.answerCallbackQuery("❌ Failed to load favorites!");
    }
  });
}
