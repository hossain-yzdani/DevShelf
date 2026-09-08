import { DashboardData } from "../../../../packages/types/analytics";
import apiClient  from "../api"

export const AnalyticsApi = {
  getData: async (days: string = '30') => {
    const response = await apiClient.get(`analytics/dashboard`, {
      params: { days }
    })
    return response.data;
  }
}