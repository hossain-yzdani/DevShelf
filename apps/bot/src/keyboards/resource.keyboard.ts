import { InlineKeyboard } from "grammy";

export function buildResourceKeyboard(slug: string, isFavorited: boolean): InlineKeyboard {
  return new InlineKeyboard()
    .text("📥 Download", `download_${slug}`)
    .success()
    .text(`${isFavorited ? "❤️" : "🤍"} Favorite`, `favorite_${slug}`)
    .primary()
    .row()
    .text("↩️ Back", "backFile");
}
