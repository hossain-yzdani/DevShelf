export interface Category {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  resourceCount: number;
  sortOrder: number;
  createdAt: string;
}