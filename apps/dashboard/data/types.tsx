import { Resource } from "../../../packages/types/resource.type";

export const typeColors: Record<Resource["type"], string> = {
  book: "bg-blue-500/20 text-blue-400",
  course: "bg-purple-500/20 text-purple-400",
  article: "bg-green-500/20 text-green-400",
  video: "bg-red-500/20 text-red-400",
  audio: "bg-yellow-500/20 text-yellow-400",
};

export const typeLabels: Record<Resource["type"], string> = {
  book: "کتاب",
  course: "دوره",
  article: "مقاله",
  video: "ویدئو",
  audio: "صوت",
};

export const USER_ROLES = [
  { value: "user", label: "کاربر عادی" },
  { value: "admin", label: "مدیر" },
  { value: "owner", label: "مدیر ارشد" },
  { value: "visitor", label: "بیننده" },
] as const;