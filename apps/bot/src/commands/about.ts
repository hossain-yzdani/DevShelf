import { Bot } from "grammy";
import { STAR_ICON_ID } from "../utils/icons";

export function registerAboutCommand(bot: Bot) {
  bot.command("about", async (ctx) => {
    await ctx.reply(
      `<tg-emoji emoji-id="${STAR_ICON_ID}">ℹ️</tg-emoji> <b>About DevShelf</b>\n\n` +
        `📚 DevShelf is a platform for developers to discover, share, and access high-quality resources.\n\n` +
        `🤖 This bot helps you:\n` +
        `• Search through thousands of resources\n` +
        `• Filter by category, tags, or type\n` +
        `• Save favorites for later\n` +
        `• Download books, videos, and more\n\n` +
        `🌐 <b>Website</b>: devshelf.ir\n` +
        `🐙 <b>GitHub</b>: github.com/devshelf\n` +
        `📧 <b>Email</b>: support@devshelf.ir\n\n` +
        `Made with love for the developer community!`,
      {
        parse_mode: "HTML",
      },
    );
  });
}
