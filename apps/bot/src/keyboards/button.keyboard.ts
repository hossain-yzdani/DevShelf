import { Keyboard } from "grammy";

const buttonKeyboard = new Keyboard()
  .text("📚 Resources")
  .text("🔍 Search")
  .row()
  .text("⭐ Populars")
  .text("❤️ Favorites")
  .row()
  .text("📥 My Downloads")
  .text("👤 My Account")
  .resized()
  .persistent()

export default buttonKeyboard;