import { Bot } from "grammy";
import { backKeyboard } from "../keyboards/main.keyboard";
import { registerCategoryCallbacks } from "./categories";
import { registerResourceCallbacks } from "./resource";
import { mainKeyboard } from "../keyboards/main.keyboard";
import { registerTagCallbacks } from "./tags";
import { registerFavoriteCallbacks } from "./favorites";
import { registerDownloadCallbacks } from "./download";
import { registerPopularCallbacks } from "./popular";

export function registerCallbacks(bot: Bot) {

  registerCategoryCallbacks(bot);
  registerResourceCallbacks(bot);
  registerTagCallbacks(bot);
  registerFavoriteCallbacks(bot);
  registerDownloadCallbacks(bot);
  registerPopularCallbacks(bot);
  
  const message =
    "🔙 <b>Back to Main Menu</b>\n\n" +
    "📚 <b>Welcome to DevShelf</b>\n\n" +
    "Discover useful books, courses, articles and other resources.\n" +
    "Save your favorites and keep track of your downloads.\n\n" +
    "Please select one of the options below:";

  bot.callbackQuery("back", async (ctx) => {
    await ctx.editMessageText(
      message,
      {
        reply_markup: mainKeyboard,
        parse_mode: "HTML",
      },
    );
  });

  bot.callbackQuery("backFile", async (ctx) => {
    await ctx.reply(
      message,
      {
        reply_markup: mainKeyboard,
        parse_mode: "HTML",
      },
    );

    try {
      await ctx.deleteMessage();
    } catch (_) {
    }
  });

    bot.callbackQuery("search", async (ctx) => {
      await ctx.editMessageText(
        "🏷️ **Tags**\n\n" +
          "Fetching resources...\n\n" +
          "⚠️ This section will be available soon.",
        {
          reply_markup: backKeyboard,
          parse_mode: "Markdown",
        },
      );
    });

  bot.callbackQuery("popular", async (ctx) => {
    await ctx.editMessageText(
      "⭐ **Popular Resources**\n\n" +
        "Fetching popular resources...\n\n" +
        "⚠️ This section will be available soon.",
      {
        reply_markup: backKeyboard,
        parse_mode: "Markdown",
      },
    );
  });

}
