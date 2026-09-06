import { User } from "../../../../packages/types/user.type";
import { apiClient } from "../api";

export const UsersApi = {
  getAll: async (params?: {
    search?: string;
    role?: string;
    isActive?: boolean;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "ASC" | "DESC";
  }): Promise<User[]> => {
    const response = await apiClient.get<User[]>("/users", { params });
    return response;
  },

  getById: async (id: string): Promise<User> => {
    const response = await apiClient.get<User>(`/users/${id}`);
    return response;
  },

  getByTelegramId: async (telegramId: number): Promise<User> => {
    const response = await apiClient.get<User>(`/users/telegram/${telegramId}`);
    return response;
  },

  getByUsername: async (username: string): Promise<User> => {
    const response = await apiClient.get<User>(`/users/username/${username}`);
    return response;
  },

  create: async (data: {
    username: string;
    firstName: string;
    lastName: string;
    telegramId: number;
    role?: string;
    isActive?: boolean;
  }): Promise<User> => {
    const response = await apiClient.post<User>("/users", data);
    return response;
  },

  update: async (
    id: string,
    data: {
      username?: string;
      firstName?: string;
      lastName?: string;
      telegramId?: number;
      role?: string;
      isActive?: boolean;
    },
  ): Promise<User> => {
    const response = await apiClient.patch<User>(`/users/${id}`, data);
    return response;
  },

  updateRole: async (id: string, role: string): Promise<User> => {
    const response = await apiClient.patch<User>(`/users/${id}/role`, { role });
    return response;
  },

  toggleActive: async (id: string, isActive: boolean): Promise<User> => {
    const response = await apiClient.patch<User>(`/users/${id}/active`, {
      isActive,
    });
    return response;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete<void>(`/users/${id}`);
  },

  getStats: async (): Promise<{
    total: number;
    active: number;
    inactive: number;
    admins: number;
    users: number;
  }> => {
    const response = await apiClient.get<{
      total: number;
      active: number;
      inactive: number;
      admins: number;
      users: number;
    }>("/users/stats");
    return response;
  },

  search: async (query: string): Promise<User[]> => {
    const response = await apiClient.get<User[]>("/users/search", { q: query });
    return response;
  },

  getActive: async (): Promise<User[]> => {
    const response = await apiClient.get<User[]>("/users/active");
    return response;
  },

  getByRole: async (role: string): Promise<User[]> => {
    const response = await apiClient.get<User[]>(`/users/role/${role}`);
    return response;
  },
};
