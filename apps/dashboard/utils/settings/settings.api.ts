// utils/settings/settings.api.ts
import apiClient from "../api";

export interface Setting {
  id: string;
  key: string;
  name: string;
  description?: string;
  type: string;
  group: string;
  value: any;
  defaultValue?: any;
  isEditable: boolean;
  isVisible: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export const SettingsApi = {
  get: async () => {
    const response = await apiClient.get("settings");
    return response.data;
  },

  getByGroup: async (group: string) => {
    const response = await apiClient.get(`settings/group/${group}`);
    return response.data;
  },

  getByKey: async (key: string) => {
    const response = await apiClient.get(`settings/${key}`);
    return response.data;
  },

  getValue: async <T = any>(key: string): Promise<T> => {
    const response = await apiClient.get(`settings/value/${key}`);
    return response.data;
  },

  getPublic: async () => {
    const response = await apiClient.get("settings/public");
    return response.data;
  },

  search: async (query: string) => {
    const response = await apiClient.get("settings/search", {
      params: { q: query },
    });
    return response.data;
  },

  update: async (key: string, value: any) => {
    const response = await apiClient.patch(`settings/${key}`, { value });
    return response.data;
  },

  updateMany: async (settings: Array<{ key: string; value: any }>) => {
    const response = await apiClient.patch("settings", { settings });
    return response.data;
  },

  updateGroup: async (
    group: string,
    settings: Array<{ key: string; value: any }>,
  ) => {
    const response = await apiClient.patch(`settings/group/${group}`, {
      settings,
    });
    return response.data;
  },

  reset: async (key: string) => {
    const response = await apiClient.patch(`settings/${key}/reset`);
    return response.data;
  },

  resetAll: async () => {
    const response = await apiClient.patch("settings/reset-all");
    return response.data;
  },

  create: async (data: {
    key: string;
    name: string;
    description?: string;
    type: string;
    group: string;
    value: any;
    defaultValue?: any;
    isEditable?: boolean;
    isVisible?: boolean;
    sortOrder?: number;
  }) => {
    const response = await apiClient.post("settings", data);
    return response.data;
  },

  delete: async (key: string) => {
    const response = await apiClient.delete(`settings/${key}`);
    return response.data;
  },

  seed: async () => {
    const response = await apiClient.post("settings/seed");
    return response.data;
  },

  getStats: async () => {
    const response = await apiClient.get("settings/stats");
    return response.data;
  },
};
