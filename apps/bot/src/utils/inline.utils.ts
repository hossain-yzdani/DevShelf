import { InlineKeyboard } from "grammy";
import { InlineQueryResultArticle } from "grammy/types";
import { Resource } from "../../../../packages/types/resource.type";

export const INLINE_RESULTS_LIMIT = 20;
export const INLINE_CACHE_TIME = 300; // 5 minutes

export function getTypeEmoji(type: string): string {
  const emojis: Record<string, string> = {
    book: "📚",
    video: "🎬",
    article: "📄",
    audio: "🎧",
    course: "🎓",
  };
  return emojis[type] || "📄";
}

export function getTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    book: "Book",
    video: "Video",
    article: "Article",
    audio: "Audio",
    course: "Course",
  };
  return labels[type] || "Resource";
}

export function buildInlineResult(
  resource: Resource,
  botUsername: string,
): InlineQueryResultArticle {
  const emoji = getTypeEmoji(resource.type);
  const label = getTypeLabel(resource.type);

  return {
    type: "article",
    id: resource.id,
    title: `${emoji} ${resource.name}`,
    description: `${label} • ${resource.author}`,
    thumbnail_url: resource.posterUrl || undefined,
    thumbnail_width: 200,
    thumbnail_height: 200,
    input_message_content: {
      message_text: buildSharedMessage(resource, botUsername),
      parse_mode: "HTML",
    },
    reply_markup: buildSharedKeyboard(resource, botUsername),
  };
}

export function buildSharedMessage(
  resource: Resource,
  botUsername: string,
): string {
  const emoji = getTypeEmoji(resource.type);
  const label = getTypeLabel(resource.type);
  const deepLink = `https://t.me/${botUsername}?start=view_${resource.slug}`;

  return (
    `${emoji} <b>${resource.name}</b>\n\n` +
    `📝 ${resource.description}\n\n` +
    `✍️ <b>Author:</b> ${resource.author}\n` +
    `📂 <b>Category:</b> ${resource.category?.name || "Unknown"}\n` +
    `📌 <b>Type:</b> ${label}\n\n` +
    `📊 ❤️ ${resource.favoritesCount} • 📥 ${resource.downloadsCount}\n\n` +
    `🔗 <a href="${deepLink}">Open in DevShelf</a>`
  );
}

export function buildSharedKeyboard(
  resource: Resource,
  botUsername: string,
): InlineKeyboard {
  const deepLink = `https://t.me/${botUsername}?start=view_${resource.slug}`;

  return new InlineKeyboard().url("📖 Open in Bot", deepLink);
}

export function buildEmptyResult(): InlineQueryResultArticle {
  return {
    type: "article",
    id: "empty",
    title: "🔍 No results found",
    description: "Try a different search term",
    input_message_content: {
      message_text: "🔍 No resources found for your search.",
    },
  };
}

export function buildWelcomeResult(): InlineQueryResultArticle {
  return {
    type: "article",
    id: "welcome",
    title: "📚 Search DevShelf Resources",
    description: "Type a keyword to search (e.g. react, docker)",
    input_message_content: {
      message_text:
        "📚 <b>DevShelf Resources</b>\n\n" +
        "Search for programming resources using inline mode.\n\n" +
        "Example: <code>@DevShelfBot react</code>",
      parse_mode: "HTML",
    },
  };
}
