import { InlineKeyboard } from "grammy";

export const mainKeyboard = new InlineKeyboard()
  .text("📚 Resources", "resources")
  .success()
  .text("🔍 Search", "search")
  .primary()
  .row()

  .text("📂 Categories", "categories")
  .primary()
  .text("🏷️ Tags", "tags")
  .primary()
  .row()

  .text("⭐ Populars", "popular")
  .success()
  .text("❤️ Favorites", "myFavorites")
  .danger()
  .row()

  .text("📥 My Downloads", "myDownloads")
  .danger();

export const backKeyboard = new InlineKeyboard().text("🔙 Back", "back");
