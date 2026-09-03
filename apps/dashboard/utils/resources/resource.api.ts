import { Resource } from "../../../../packages/types/resource.type";
import apiClient from "../api";

export const ResourcesApi = {
  getAll: async (params?: {
    search?: string;
    type?: string;
    categoryId?: string;
    tagIds?: string[];
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "ASC" | "DESC";
  }) => {
    const response = await apiClient.get("/resources", { params });
    console.log(response.data);
    return response.data;
  },

  getBySlug: async (slug: string) => {
    const response = await apiClient.get(`/resources/${slug}`);
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiClient.get(`/resources/id/${id}`);
    return response.data;
  },

  getPopular: async (limit: number = 10) => {
    const response = await apiClient.get("/resources/popular", { 
      params: { limit }
     });
    return response.data;
  },

  // دریافت آخرین منابع
  getLatest: async (limit: number = 10) => {
    const response = await apiClient.get("/resources/latest", { 
      params: { limit }
     });
    return response.data;
  },

  // دریافت منابع با بیشترین دانلود
  getMostDownloaded: async (limit: number = 10) => {
    const response = await apiClient.get("/resources/most-downloaded", {
      params: { limit },
    });
    return response.data;
  },

  // جستجوی منابع
  search: async (query: string, limit: number = 10) => {
    const response = await apiClient.get("/resources/search", {
      params: { q: query, limit },
    });
    return response.data;
  },

  // جستجوی پیشرفته
  advancedSearch: async (filters: {
    query?: string;
    type?: string;
    categoryId?: string;
    tagId?: string;
    author?: string;
    limit?: number;
  }) => {
    const response = await apiClient.get("/resources/advanced-search", {
      params: filters,
    });
    return response.data;
  },

  create: async (data: {
    name: string;
    description: string;
    type: string;
    author: string;
    fileUrl: string;
    posterUrl?: string;
    category: string;
    tags?: string[];
  }) => {
    const response = await apiClient.post("/resources", data);
    return response.data;
  },

  update: async (
    slug: string,
    data: {
      name?: string;
      description?: string;
      type?: string;
      author?: string;
      fileUrl?: string;
      posterUrl?: string;
      categoryId?: string;
      tagIds?: string[];
    },
  ) => {
    const response = await apiClient.patch(`/resources/${slug}`, data);
    return response.data;
  },

  // حذف منبع
  delete: async (slug: string) => {
    const response = await apiClient.delete(`/resources/${slug}`);
    return response.data;
  },

  // دریافت آمار منابع
  getStats: async () => {
    const response = await apiClient.get("/resources/stats");
    return response.data;
  },

  // دریافت منابع یک دسته‌بندی
  getByCategory: async (categorySlug: string) => {
    const response = await apiClient.get(
      `/categories/${categorySlug}/resources`,
    );
    return response.data;
  },

  // دریافت منابع یک تگ
  getByTag: async (tagSlug: string) => {
    const response = await apiClient.get(`/tags/${tagSlug}/resources`);
    return response.data;
  },
};
