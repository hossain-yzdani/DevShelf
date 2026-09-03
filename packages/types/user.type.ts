// src/types/user.types.ts
export interface FavoriteInfo {
  id: string;
  resourceId: string;
  createdAt: Date;
}

export interface DownloadInfo {
  id: string;
  resourceId: string;
  downloadedAt: Date;
}

export interface SearchInfo {
  id: string;
  query: string;
  createdAt: Date;
}

export interface User {
  id: string;
  telegramId: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  languageCode?: string;
  isActive: boolean;
  isAdmin: boolean;
  role: string;
  notifications: boolean;
  theme: string;
  favoritesCount: number;
  downloadsCount: number;
  searchesCount: number;
  favorites?: FavoriteInfo[];
  downloads?: DownloadInfo[];
  searches?: SearchInfo[];
  createdAt: Date;
  updatedAt: Date;
  lastActivity?: Date;
}
