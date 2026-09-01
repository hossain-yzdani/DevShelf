import axios from "axios";
import { logger } from "../utils/logger";
import { env } from "../config/env";
import { ResourceService } from "./resource.service";

export class DownloadService {
  private static getClient() {
    return axios.create({
      baseURL: env.API_BASE_URL,
      timeout: 15000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  static async getUserDownloads(telegramId: number): Promise<any[]> {
    try {
      const client = this.getClient();
      const response = await client.get<any[]>(`/downloads/users/${telegramId}`, {
        headers: {
          "x-telegram-id": telegramId.toString(),
        },
      });

      const downloadsWithResources = await Promise.all(
        response.data.map(async (download) => {
          if (download.resourceId) {
            try {
              const resource = await ResourceService.getById(download.resourceId);
              return {
                ...download,
                resource,
              };
            } catch (error: any) {
              logger.error(
                { resourceId: download.resourceId, error: error.message },
                "Failed to fetch resource for download",
              );
              return download;
            }
          }
          return download;
        }),
      );

      return downloadsWithResources;
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.error(
          {
            telegramId,
            status: error.response?.status,
            data: error.response?.data,
            message: error.message,
          },
          "Failed to fetch downloads",
        );
      } else {
        logger.error({ telegramId, error }, "Failed to fetch downloads");
      }
      throw error;
    }
  }

  static async getDownloadCount(telegramId: number): Promise<number> {
    try {
      const client = this.getClient();
      const response = await client.get<{ count: number }>(`/users/${telegramId}/downloads/count`, {
        headers: {
          "x-telegram-id": telegramId.toString(),
        },
      });
      return response.data.count;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.error(
          {
            telegramId,
            status: error.response?.status,
            data: error.response?.data,
            message: error.message,
          },
          "Failed to fetch download count",
        );
      } else {
        logger.error({ telegramId, error }, "Failed to fetch download count");
      }
      return 0;
    }
  }

  static async getDownloadByResource(telegramId: number, slug: string): Promise<any> {
    try {
      const client = this.getClient();
      const response = await client.get<any>(`/users/${telegramId}/downloads/${slug}`, {
        headers: {
          "x-telegram-id": telegramId.toString(),
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.error(
          {
            telegramId,
            slug,
            status: error.response?.status,
            data: error.response?.data,
            message: error.message,
          },
          "Failed to fetch download by resource",
        );
      } else {
        logger.error({ telegramId, slug, error }, "Failed to fetch download by resource");
      }
      throw error;
    }
  }
}