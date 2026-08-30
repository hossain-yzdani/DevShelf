export interface Tag {
  id: string;
  name: string;
  slug: string;
  resourceCount: number;
  createdAt: string;
}

// export interface TagFormData {
//   name: string;
//   slug: string;
// }

// export interface TagFormErrors {
//   name?: string;
//   slug?: string;
// }

// export interface TagResponse {
//   id: string;
//   name: string;
//   slug: string;
//   resourceCount: number;
//   createdAt: string;
//   updatedAt?: string;
// }

// export interface TagsListResponse {
//   data: Tag[];
//   pagination: {
//     page: number;
//     limit: number;
//     total: number;
//     totalPages: number;
//   };
// }

export interface CreateTagDto {
  name: string;
  slug?: string;
}

export interface UpdateTagDto {
  name?: string;
  slug?: string;
}

export interface TagFilters {
  search?: string;
  sortBy?: 'name' | 'createdAt' | 'resourceCount';
  sortOrder?: 'asc' | 'desc';
}