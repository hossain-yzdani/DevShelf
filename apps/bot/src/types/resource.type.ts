export type ResourceType = "BOOK" | "VIDEO" | "ARTICLE" | "AUDIO" | "COURSE";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Resource {
  id: string;
  name: string;
  slug: string;
  description: string;
  type: ResourceType;
  fileUrl: string;
  posterUrl: string;
  author: string;
  favoritesCount: number;
  downloadsCount: number;
  category: Category;
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ResourceFilters {
  search?: string;
  categoryId?: string;
  tagIds?: string[];
  type?: ResourceType;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
}
