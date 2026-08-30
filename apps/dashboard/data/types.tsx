import { Resource } from "@/types/Resource";

export const typeColors: Record<Resource["type"], string> = {
  BOOK: "bg-blue-500/20 text-blue-400",
  COURSE: "bg-purple-500/20 text-purple-400",
  ARTICLE: "bg-green-500/20 text-green-400",
  CHEATSHEET: "bg-amber-500/20 text-amber-400",
  DOCUMENTATION: "bg-cyan-500/20 text-cyan-400",
  OTHER: "bg-gray-500/20 text-gray-400",
};

export const typeLabels: Record<Resource["type"], string> = {
  BOOK: "کتاب",
  COURSE: "دوره",
  ARTICLE: "مقاله",
  CHEATSHEET: "خلاصه",
  DOCUMENTATION: "مستندات",
  OTHER: "سایر",
};
