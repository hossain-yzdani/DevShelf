import { Bot } from "grammy";
import { logger } from "../utils/logger";
import { STAR_ICON_ID } from "../utils/icons";

export function registerHelpCommand(bot: Bot) {
  bot.command('help', async (ctx) => {
    
    logger.info(`User ${ctx.from?.id} got help`)

    await ctx.reply(
      `<tg-emoji emoji-id="${STAR_ICON_ID}">📖</tg-emoji> <b>DevShelf Bot Help</b>\n\n` +
        `🔍 <b>Search</b>: Find resources by keywords\n` +
        `📂 <b>Categories</b>: Browse resources by category\n` +
        `🏷️ <b>Tags</b>: Filter resources by tags\n` +
        `⭐ <b>Popular</b>: View most popular resources\n` +
        `❤️ <b>Favorites</b>: Your saved resources\n` +
        `📥 <b>Downloads</b>: Your download history\n\n` +
        `Need more help? \nContact: @hossainyazdani`,
      {
        parse_mode: "HTML",
      },
    );
  })
}