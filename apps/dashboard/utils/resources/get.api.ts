import Client from "../api";
import { Resource } from "../../../../packages/types/resource.type";

interface GetResourcesParams {
  search?: string;
  type?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
}

export async function getResources(params?: GetResourcesParams): Promise<Resource[]> {
  try {
    const response = await Client.get<Resource[]>("/resources", {
      params,
    });
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching resources:", error);
    return [];
  }
}
