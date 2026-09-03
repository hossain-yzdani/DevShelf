export interface ResourceInfo {
  id: string;
  name: string;
  type: string;
  author: string;
  createdAt: Date;
}

export interface Tag {
  id: string;
  slug: string;
  name: string;
  description: string;
  resourcesCount: number;
  resources: ResourceInfo[];
  createdAt: Date;
  updatedAt: Date;
}
