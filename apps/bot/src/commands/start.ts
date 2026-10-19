import { Bot } from "grammy";
import { InlineKeyboard } from "grammy";
import { logger } from "../utils/logger";
import { STAR_ICON_ID } from "../utils/icons";
import { Auth } from "../../../../packages/types/auth";
import { AuthService } from "../services/auth.service";
import { ResourceService } from "../services/resource.service";
import { getTypeEmoji } from "../utils/inline.utils";
import { mainKeyboard } from "../keyboards/main.keyboard";
import { FavoriteService } from "../services/favorite.service";
import { formatResourceMessage } from "../callbacks/resource";
import { buildResourceKeyboard } from "../keyboards/resource.keyboard";
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

    const payload = ctx.match?.trim();

    if (!ctx.from?.id) {
      await ctx.reply("❌ Unable to identify user.");
      return;
    }

    if (payload && payload.startsWith("view_")) {
      const slug = payload.replace("view_", "");

      try {
        const resource = await ResourceService.getBySlug(slug);
        const telegramId = ctx.from?.id;

        const isFavorited = await FavoriteService.isFavorited(slug, telegramId);

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
        return;
      } catch (error) {
        logger.error({ slug, error }, "Failed to load resource from deep link");
        // continue to main menu
      }
    }

    await ctx.reply(
      `<tg-emoji emoji-id="${STAR_ICON_ID}">⭐</tg-emoji> Welcome to <b>DevShelf</b>! \n\n` +
        `📚 Here you can find books about computer, programming and artificial intelligence.\n\n` +
        `<b>start:</b> /start \n<b>about:</b> /about \n<b>help:</b> /help\n\n` +
        `🔍 Use below menu to find your book:`,
      {
        reply_markup: buttonKeyboard,
        parse_mode: "HTML",
      },
    );
  });
}
