import { Category } from "../../../../packages/types/category.type";
import apiClient from "../api";

export const CategoriesApi = {
  get: async (page: number, limit: number) => {
    const response = await apiClient.get(`categories/?page=${page}&limit=${limit}`);
    return response.data;
  },

  getAll: async (): Promise<Category[]> => {
    const response = await apiClient.get<Category[]>("/categories");
    return response.data;
  },

  getBySlug: async (slug: string): Promise<Category> => {
    const response = await apiClient.get<Category>(`/categories/${slug}`);
    return response.data;
  },

  getResources: async (slug: string): Promise<any[]> => {
    const response = await apiClient.get<any[]>(
      `/categories/${slug}/resources`,
    );
    return response.data;
  },

  create: async (data: {
    name: string;
    description: string;
    slug?: string;
  }): Promise<Category> => {
    const response = await apiClient.post<Category>("/categories", data);
    return response.data;
  },

  update: async (
    slug: string,
    data: { name?: string; description?: string; slug?: string },
  ): Promise<Category> => {
    const response = await apiClient.patch<Category>(
      `/categories/${slug}`,
      data,
    );
    return response.data;
  },

  delete: async (slug: string): Promise<void> => {
    await apiClient.delete<void>(`/categories/${slug}`);
  },

  getStats: async (): Promise<{ total: number }> => {
    const response = await apiClient.get<{ total: number }>(
      "/categories/stats",
    );
    return response.data;
  },
};
