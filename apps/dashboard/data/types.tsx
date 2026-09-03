import { Resource } from "../../../packages/types/resource.type";

export const typeColors: Record<Resource["type"], string> = {
  book: "bg-blue-500/20 text-blue-400",
  COURSE: "bg-purple-500/20 text-purple-400",
  ARTICLE: "bg-green-500/20 text-green-400",
  video: "bg-red-500/20 text-red-400",
  AUDIO: "bg-yellow-500/20 text-yellow-400"
};

export const typeLabels: Record<Resource["type"], string> = {
  book: "کتاب",
  COURSE: "دوره",
  ARTICLE: "مقاله",
  video: "ویدئو",
  AUDIO: "صوت"
};
