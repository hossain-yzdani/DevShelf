import { logger } from "../utils/logger";
import { apiClient } from "./api.client";

export class UserService {
  static async getUserByTgId(telegramId: number) {
    try {
      const user = await apiClient.get(`/users/tg/${telegramId}`);
      return user;
    } catch (error) {
      logger.error({ error }, "Failed to fetch category resources");
      throw error;
    }
  }
}
