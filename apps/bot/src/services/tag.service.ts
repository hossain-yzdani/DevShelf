import { apiClient } from "./api.client";
import { logger } from "../utils/logger";
import { Resource } from "../../../../packages/types/resource.type";
import { Tag } from "../../../../packages/types/tag.type";


export class TagService {
  static async getAll(): Promise<Tag[]> {
    try {
      const tags = await apiClient.get<Tag[]>("/tags");
      return tags;
    } catch (error) {
      logger.error({ error }, "Failed to fetch tags");
      throw error;
    }
  }

  static async getResourcesByTag(tagSlug: string): Promise<Resource[]> {
    try {
      const data: any = await apiClient.get(`/tags/${tagSlug}`);
      return data.resources || data.data || [];
    } catch (error) {
      logger.error({ tagSlug, error }, "Failed to fetch tag resources");
      throw error;
    }
  }

  static async getPopularTags(limit: number = 10): Promise<Tag[]> {
    try {
      const tags = await apiClient.get<Tag[]>("/tags/popular", { limit });
      return tags;
    } catch (error) {
      logger.error({ limit, error }, "Failed to fetch popular tags");
      throw error;
    }
  }

  static async searchTags(query: string): Promise<Tag[]> {
    try {
      const tags = await apiClient.get<Tag[]>("/tags/search", { q: query });
      return tags;
    } catch (error) {
      logger.error({ query, error }, "Failed to search tags");
      throw error;
    }
  }
}
