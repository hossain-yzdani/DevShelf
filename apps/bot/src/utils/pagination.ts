import { InlineKeyboard } from "grammy";

interface PaginationOptions {
  currentPage: number;
  totalPages: number;
  baseCallback: string; // مثلا "resources_page"
  resourceSlug?: string; // اگه توی یه منبع خاص هستیم
}

export function buildPaginationKeyboard({
  currentPage,
  totalPages,
  baseCallback,
  resourceSlug,
}: PaginationOptions): InlineKeyboard {
  const keyboard = new InlineKeyboard();

  // دکمه قبلی
  if (currentPage > 1) {
    keyboard.text(
      "‹ قبلی",
      `${baseCallback}_${currentPage - 1}${resourceSlug ? `_${resourceSlug}` : ""}`,
    );
  }

  // نمایش شماره صفحه
  keyboard.text(`page ${currentPage} of ${totalPages}`, "noop");

  // دکمه بعدی
  if (currentPage < totalPages) {
    keyboard.text(
      "بعدی ›",
      `${baseCallback}_${currentPage + 1}${resourceSlug ? `_${resourceSlug}` : ""}`,
    );
  }

  return keyboard;
}
