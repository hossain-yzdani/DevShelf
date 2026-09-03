// export interface Resource {
//   id: string;
//   name: string;
//   slug: string;
//   description: string;
//   type: 'BOOK' | 'VIDEO' | 'ARTICLE' | 'AUDIO' | 'COURSE';
//   fileUrl: string;
//   posterUrl: string;
//   author: string;
//   favoritesCount: number;
//   downloadsCount: number;
//   category: {
//     id: string;
//     name: string;
//   };
//   tags: { id: string; name: string }[];
// }

import { Resource } from "./resource.type";

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  resourcesCount: number;
  recentResources?: Resource[];
  createdAt: Date;
  updatedAt: Date;
}
export interface Tag {
  id: string;
  name: string;
  slug: string;
}