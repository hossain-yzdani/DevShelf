export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginatedResponseN
}

export interface PaginatedResponseN {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
