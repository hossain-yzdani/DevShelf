import { Tag } from "../../../../packages/types/tag.type";
import apiClient from "../api";


export const TagsApi = {
  get: async (page: number, limit: number) => {
    const response = await apiClient.get(`tags/?limit=${limit}&page=${page}`)
    return response.data;
  },
    
  getAll: async (): Promise<Tag[]> => {
    const response = await apiClient.get<Tag[]>("/tags");
    return response.data;
  },

  getBySlug: async (slug: string): Promise<Tag> => {
    const response = await apiClient.get<Tag>(`/tags/${slug}`);
    return response.data;
  },

  getResources: async (slug: string): Promise<any[]> => {
    const response = await apiClient.get<any[]>(`/tags/${slug}/resources`);
    return response.data;
  },

  getPopular: async (limit: number = 10): Promise<Tag[]> => {
    const response = await apiClient.get<Tag[]>("/tags/popular", { params: { limit } });
    return response.data;
  },

  create: async (data: {
    name: string;
    description: string;
    slug?: string;
  }): Promise<Tag> => {
    const response = await apiClient.post<Tag>("/tags", data);
    return response.data;
  },

  update: async (
    slug: string,
    data: { name?: string; description?: string; slug?: string },
  ): Promise<Tag> => {
    const response = await apiClient.patch<Tag>(`/tags/${slug}`, data);
    return response.data;
  },

  delete: async (slug: string): Promise<void> => {
    await apiClient.delete<void>(`/tags/${slug}`);
  },

  getStats: async (): Promise<{ total: number }> => {
    const response = await apiClient.get<{ total: number }>("/tags/stats");
    return response.data;
  },

  search: async (query: string): Promise<Tag[]> => {
    const response = await apiClient.get<Tag[]>("/tags/search", { params: { q: query } });
    return response.data;
  },
};
