export interface Resource {
  id: string;
  title: string;
  description: string;
  author: string;
  type:
    | "BOOK"
    | "COURSE"
    | "ARTICLE"
    | "CHEATSHEET"
    | "DOCUMENTATION"
    | "OTHER";
  coverUrl: string | null;
  downloadCount: number;
  isFeatured: boolean;
  createdAt: string;
}

