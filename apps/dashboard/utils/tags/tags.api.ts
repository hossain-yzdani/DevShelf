import { Tag } from "../../../../packages/types/tag.type";
import { apiClient } from "../api";


export const TagsApi = {
  getAll: async (): Promise<Tag[]> => {
    const response = await apiClient.get<Tag[]>("/tags");
    return response;
  },

  getBySlug: async (slug: string): Promise<Tag> => {
    const response = await apiClient.get<Tag>(`/tags/${slug}`);
    return response;
  },

  getResources: async (slug: string): Promise<any[]> => {
    const response = await apiClient.get<any[]>(`/tags/${slug}/resources`);
    return response;
  },

  getPopular: async (limit: number = 10): Promise<Tag[]> => {
    const response = await apiClient.get<Tag[]>("/tags/popular", { limit });
    return response;
  },

  create: async (data: {
    name: string;
    description: string;
    slug?: string;
  }): Promise<Tag> => {
    const response = await apiClient.post<Tag>("/tags", data);
    return response;
  },

  update: async (
    slug: string,
    data: { name?: string; description?: string; slug?: string },
  ): Promise<Tag> => {
    const response = await apiClient.patch<Tag>(`/tags/${slug}`, data);
    return response;
  },

  delete: async (slug: string): Promise<void> => {
    await apiClient.delete<void>(`/tags/${slug}`);
  },

  getStats: async (): Promise<{ total: number }> => {
    const response = await apiClient.get<{ total: number }>("/tags/stats");
    return response;
  },

  search: async (query: string): Promise<Tag[]> => {
    const response = await apiClient.get<Tag[]>("/tags/search", { q: query });
    return response;
  },
};
