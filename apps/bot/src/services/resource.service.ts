import { apiClient } from "./api.client";
import { logger } from "../utils/logger";
import { Resource } from "../../../../packages/types/resource.type";

export class ResourceService {
  static async getBySlug(slug: string): Promise<Resource> {
    try {
      const resource = await apiClient.get<Resource>(`/resources/${slug}`);

      return resource;
    } catch (error) {
      logger.error({ slug, error }, "Failed to fetch resource");
      throw error;
    }
  }

  static async getById(id: string): Promise<Resource> {
    try {
      const resource = await apiClient.get<Resource>(`/resources/id/${id}`);

      return resource;
    } catch (error) {
      logger.error({ id, error }, "Failed to fetch resource");
      throw error;
    }
  }

  static async getPopular(limit: number = 10): Promise<Resource[]> {
    try {
      const response = await apiClient.get<Resource[]>("/resources/popular", {
        params: { limit },
      });
      return response;
    } catch (error) {
      logger.error({ error }, "Failed to fetch popular resources");
      throw error;
    }
  }

  static async searchResources(
    query: string,
    limit: number = 10,
  ): Promise<Resource[]> {
    try {
      const response = await apiClient.get<Resource[]>("/resources/search", {
        q: query,
        limit,
      });
      return response;
    } catch (error) {
      logger.error({ query, error }, "Failed to search resources");
      throw error;
    }
  }
}
