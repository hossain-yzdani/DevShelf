import axios from "axios";
import { Readable } from "stream";
import { logger } from "../utils/logger";

export class FileService {
  static async downloadFile(fileUrl: string): Promise<Readable> {
    try {
      const response = await axios.get(fileUrl, {
        responseType: "arraybuffer",
        timeout: 60000,
      });
      return response.data;
    } catch (error: any) {
      logger.error(
        { fileUrl, error: error.message },
        "Failed to download file from server",
      );
      throw error;
    }
  }
}
