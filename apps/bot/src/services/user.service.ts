import { Auth } from "../../../../packages/types/auth";
import { logger } from "../utils/logger";
import { apiClient } from "./api.client";

export class UserService {
  static async getUserByTgId(body: Auth) {
    try {
      const user = await apiClient.post<Auth>("/auth/register", body);
      return user;
    } catch (error) {
      logger.error({ error }, "Failed to fetch category resources");
      throw error;
    }
  }
}
