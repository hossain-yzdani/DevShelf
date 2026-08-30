import axios from "axios";
import { logger } from "../utils/logger";
import { env } from "../config/env";

export class FavoriteService {
  private static getClient() {
    return axios.create({
      baseURL: env.API_BASE_URL,
      timeout: 15000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  static async toggleFavorite(
    slug: string,
    telegramId: number,
  ): Promise<{ isFavorited: boolean }> {
    try {
      const client = this.getClient();
      const response = await client.post<{ isFavorited: boolean }>(
        "/favorites/toggle",
        { resourceSlug: slug, telegramId: telegramId },
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.error(
          {
            slug,
            telegramId,
            status: error.response?.status,
            data: error.response?.data,
            message: error.message,
          },
          "Failed to toggle favorite",
        );
      } else {
        logger.error({ slug, telegramId, error }, "Failed to toggle favorite");
      }
      throw error;
    }
  }

  static async getFavorites(userId: string): Promise<any[]> {
    try {
      const client = this.getClient();
      const response = await client.get<any[]>("/favorites", {
        headers: {
          "X-User-Id": userId,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.error(
          {
            userId,
            status: error.response?.status,
            data: error.response?.data,
            message: error.message,
          },
          "Failed to fetch favorites",
        );
      } else {
        logger.error({ userId, error }, "Failed to fetch favorites");
      }
      throw error;
    }
  }

  static async isFavorited(slug: string, telegramId: number): Promise<boolean> {
    try {
      const client = this.getClient();
      const response = await client.post<{ isFavorited: boolean }>(
        `/favorites/check/${slug}`,
        { telegramId },
      );
      return response.data.isFavorited;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.error(
          {
            slug,
            telegramId,
            status: error.response?.status,
            data: error.response?.data,
            message: error.message,
          },
          "Failed to check favorite",
        );
      } else {
        logger.error({ slug, telegramId, error }, "Failed to check favorite");
      }
      return false;
    }
  }

  static async removeFavorite(slug: string, userId: string): Promise<void> {
    try {
      const client = this.getClient();
      await client.delete(`/favorites/${slug}`, {
        headers: {
          "X-User-Id": userId,
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.error(
          {
            slug,
            userId,
            status: error.response?.status,
            data: error.response?.data,
            message: error.message,
          },
          "Failed to remove favorite",
        );
      } else {
        logger.error({ slug, userId, error }, "Failed to remove favorite");
      }
      throw error;
    }
  }
}
