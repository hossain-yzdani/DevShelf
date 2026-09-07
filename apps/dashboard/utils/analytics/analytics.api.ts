import { DashboardData } from "../../../../packages/types/analytics";
import { apiClient } from "../api"

export const AnalyticsApi = {
  getData: async (days: string = '30') => {
    const response = apiClient.get<DashboardData>(`/analytics/dashboard`, {
      days: days
    })
    return response;
  }
}