export type ResourceType = "book" | "video" | "article" | "audio" | "course";

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
  category: Category;
  tags: Tag[];
  createdAt: string | Date;
  updatedAt: string | Date;
  
  favoritesCount?: number;
  downloadsCount?: number;
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
