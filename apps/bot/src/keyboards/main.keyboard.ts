import { InlineKeyboard } from "grammy";
import { STAR_ICON_ID } from "../utils/icons";

export const mainKeyboard = new InlineKeyboard()
  .text("📚 Find resources", "search")
  .primary()
  .text("📂 Categories", "categories")
  .primary()
  .icon(STAR_ICON_ID)
  .row()
  .text("🏷️ Tags", "tags")
  .success()
  .text("⭐ Populars", "popular")
  .success()
  .row()
  .text("❤️ Favorites", "myFavorites")
  .danger()
  .text("📥 My downloads", "downloads");

export const backKeyboard = new InlineKeyboard().text("↩️ Return", "back");
