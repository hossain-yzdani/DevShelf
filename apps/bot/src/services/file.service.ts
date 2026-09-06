import axios from "axios";
import { Readable } from "stream";
import { logger } from "../utils/logger";
import { Resource } from "../../../../packages/types/resource.type";
import { env } from "process";

export class FileService {
  private static getClient() {
    return axios.create({
      baseURL: env.API_BASE_URL,
      timeout: 15000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  static async downloadFile(
    telegramId: number,
    resource: Resource,
  ): Promise<Readable> {
    try {
      const client = this.getClient();
      const result = await client.post(
        "/downloads",
        { telegramId: telegramId.toString(), resourceSlug: resource.slug },
        {
          headers: {
            "x-telegram-id": telegramId.toString(),
          },
        },
      );

      logger.info(result.data);

      const response = await axios.get(resource.fileUrl, {
        responseType: "arraybuffer",
        timeout: 60000,
      });

      return response.data;
    } catch (error: any) {
      logger.error(
        { fileUrl: resource.fileUrl, error: error.message },
        "Failed to download file from server",
      );
      throw error;
    }
  }
}
