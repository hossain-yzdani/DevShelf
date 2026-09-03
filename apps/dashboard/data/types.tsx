import { Resource } from "../../../packages/types/resource.type";

export const typeColors: Record<Resource["type"], string> = {
  BOOK: "bg-blue-500/20 text-blue-400",
  COURSE: "bg-purple-500/20 text-purple-400",
  ARTICLE: "bg-green-500/20 text-green-400",
  VIDEO: "bg-red-500/20 rext-red-400",
  AUDIO: "bg-yellow-500/20 text-yellow-400"
};

export const typeLabels: Record<Resource["type"], string> = {
  BOOK: "کتاب",
  COURSE: "دوره",
  ARTICLE: "مقاله",
  VIDEO: "ویدئو",
  AUDIO: "صوت"
};
