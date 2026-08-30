import { apiClient } from "./api.client";
import { logger } from "../utils/logger";
import { Resource } from "../types/resource.type";
import { Readable } from "stream";

export class ResourceService {
  static async getBySlug(slug: string): Promise<Resource> {
    try {
      const resource = await apiClient.get<Resource>(
        `/resources/${slug}`,
      );

      return resource;
    } catch (error) {
      logger.error({ slug, error }, "Failed to fetch resource");
      throw error;
    }
  }

  static async getPopular(limit: number = 10): Promise<Resource[]> {
    try {
      return await apiClient.get<Resource[]>("/resources/popular", { limit });
    } catch (error) {
      logger.error({ error }, "Failed to fetch popular resources");
      throw error;
    }
  }
}
