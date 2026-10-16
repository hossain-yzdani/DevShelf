import { Bot, Context } from "grammy";
import { logger } from "../utils/logger";
import { accountHandler } from "./acccount.handler";
// import { showResourcesPage } from "./resource.handler";
// import { showFavorites } from "./favorite.handler";
// import { showDownloads } from "./download.handler";


type HandlerFn = (ctx: Context) => Promise<void>;

const handlers: Record<string, HandlerFn> = {
  "📚 Resources": async (ctx) => {
    // await showResourcesPage(ctx, 1);
  },

  "🔍 Search": async (ctx) => {
    await ctx.reply("🔍 Search feature coming soon...");
  },

  "⭐ Populars": async (ctx) => {
    await ctx.reply("⭐ Populars feature coming soon...");
  },

  "❤️ Favorites": async (ctx) => {
    // await showFavorites(ctx);
  },

  "📥 My Downloads": async (ctx) => {
    // await showDownloads(ctx);
  },

  "👤 My Account": async (ctx) => {
    await accountHandler(ctx);
  },
};

export function registerKeyboardHandlers(bot: Bot) {
  Object.entries(handlers).forEach(([label, handler]) => {
    bot.hears(label, handler);
  });

  logger.info(
    `✅ Registered ${Object.keys(handlers).length} keyboard handlers`,
  );
}
