import { Bot } from "grammy";
import { mainKeyboard } from "../keyboards/main.keyboard";
import { logger } from "../utils/logger";
import { STAR_ICON_ID } from "../utils/icons";
import { Auth } from "../../../../packages/types/auth";
import { AuthService } from "../services/auth.service";
import buttonKeyboard from "../keyboards/button.keyboard";

export async function registerStartCommand(bot: Bot) {
bot.command("start", async (ctx) => {
  const userData: Auth = {
    telegramId: ctx.from?.id,
    username: ctx.from?.username || undefined,
    firstName: ctx.from?.first_name || undefined,
    lastName: ctx.from?.last_name || undefined,
    languageCode: ctx.from?.language_code || undefined,
  };

  try {
    const result = await AuthService.register(userData);
    logger.info(result);
  } catch (error) {
    logger.error(error);
  }

  await ctx.reply(
    `<tg-emoji emoji-id="${STAR_ICON_ID}">⭐</tg-emoji> Welcome to <b>DevShelf</b>! \n\n` +
      `📚 Here you can find books about computer, programming and artifishal inteligence.\n\n` +
      `<b>start:</b> /start \n<b>about:</b> /about \n<b>help:</b> /help\n\n` +
      `🔍 Use below menu to find your book:`,
    {
      reply_markup: buttonKeyboard,
      parse_mode: "HTML",
    },
  );
});
}
