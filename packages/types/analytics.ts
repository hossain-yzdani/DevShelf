export interface StatsData {
  totalResources: number;
  totalUsers: number;
  totalDownloads: number;
  totalFavorites: number;
  growth: {
    downloads: number;
    users: number;
  };
}

export interface ChartDataPoint {
  date: string;
  count: string;
}

export interface CategoryDataPoint {
  category: string;
  count: string;
}

export interface ChartData {
  downloads: ChartDataPoint[];
  userGrowth: ChartDataPoint[];
  categories: CategoryDataPoint[];
}

export interface RecentActivity {
  id: string;
  type: "download" | "favorite" | "search";
  user: string;
  resource: string;
  time: string;
  timestamp: string;
}

export interface PopularResource {
  id: string;
  name: string;
  author: string;
  slug: string;
  downloads: string;
  favorites: string;
  views: string;
  type: string;
}
export interface DashboardData {
  stats: StatsData;
  charts: ChartData;
  recentActivities: RecentActivity[];
  popularResources: PopularResource[];
}
