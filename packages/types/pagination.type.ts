export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedResponseN {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

