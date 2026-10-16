import { Bot } from "grammy";
import { InlineKeyboard } from "grammy";
import { logger } from "../utils/logger";
import { STAR_ICON_ID } from "../utils/icons";
import { Auth } from "../../../../packages/types/auth";
import { AuthService } from "../services/auth.service";
import { ResourceService } from "../services/resource.service";
import { getTypeEmoji } from "../utils/inline.utils";
import { mainKeyboard } from "../keyboards/main.keyboard";

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

    if (payload && payload.startsWith("view_")) {
      const slug = payload.replace("view_", "");

      try {
        const resource = await ResourceService.getBySlug(slug);

        if (resource) {
          const emoji = getTypeEmoji(resource.type);

          const message =
            `${emoji} <b>${resource.name}</b>\n\n` +
            `📝 ${resource.description}\n\n` +
            `✍️ <b>Author:</b> ${resource.author}\n` +
            `📂 <b>Category:</b> ${resource.category?.name || "Unknown"}\n` +
            `🏷️ <b>Tags:</b> ${
              resource.tags?.map((t) => `#${t.name}`).join(" ") || "None"
            }\n\n` +
            `📊 <b>Statistics:</b>\n` +
            `❤️ ${resource.favoritesCount} favorites\n` +
            `📥 ${resource.downloadsCount} downloads`;

          const keyboard = new InlineKeyboard()
            .text("📥 Download", `download_${resource.slug}`)
            .success()
            .text("❤️ Favorite", `favorite_${resource.slug}`)
            .danger()
            .row()
            .text("🔙 Back", "main");

          if (resource.posterUrl) {
            await ctx.replyWithPhoto(resource.posterUrl, {
              caption: message,
              parse_mode: "HTML",
              reply_markup: keyboard,
            });
          } else {
            await ctx.reply(message, {
              parse_mode: "HTML",
              reply_markup: keyboard,
            });
          }
          return;
        }
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
        reply_markup: mainKeyboard,
        parse_mode: "HTML",
      },
    );
  });
}
