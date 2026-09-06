import { apiClient } from "./api.client";
import { logger } from "../utils/logger";
import { Category } from "../../../../packages/types/category.type";

export class CategoryService {
  static async getAll(): Promise<Category[]> {
    try {
      const categories = await apiClient.get<Category[]>("/categories");
      return categories;
    } catch (error) {
      logger.error({ error }, "Failed to fetch categories");
      throw error;
    }
  }

  static async getResourcesByCategory(categorySlug: string): Promise<any> {
    try {
      const data: any = await apiClient.get(
        `/categories/${categorySlug}`,
      );
      return data.resources;
    } catch (error) {
      logger.error({ categorySlug, error }, "Failed to fetch category resources");
      throw error;
    }
  }
}
