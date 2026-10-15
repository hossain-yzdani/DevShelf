import { InlineKeyboard } from "grammy";

export const mainKeyboard = new InlineKeyboard()
  .text("📚 Resources", "resources")
  .success()
  .text("🔍 Search", "search")
  .success()
  .row()

  .text("📂 Categories", "categories")
  .primary()
  .text("🏷️ Tags", "tags")
  .primary()
  .row()

  .text("⭐ Populars", "popular")
  .danger()
  .text("❤️ Favorites", "myFavorites")
  .danger()
  .row()

  .text("📥 My Downloads", "myDownloads");

export const backKeyboard = new InlineKeyboard().text("🔙 Back", "back");
