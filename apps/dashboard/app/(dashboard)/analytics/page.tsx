"use client";

import { useState } from "react";
import {
  Filter,
} from "lucide-react";
import { DownloadsChart } from "@/components/analytics/charts/downloadsChart";
import StatsAnalytics from "@/components/analytics/stats/stats";
import RecentActivities from "@/components/analytics/recentActivities/recentActivities";
import { CustomSelect } from "@/components/ui/customSelect/customSelect";
import { UserGrowthChart } from "@/components/analytics/charts/userGrowthChart";
import { CategoryChart } from "@/components/analytics/charts/categoryChart";
import { PieChartComponent } from "@/components/analytics/charts/pieChartComponent";
import { PopularResourcesTable } from "@/components/analytics/table/popularResourcesTable";

const statsData = {
  totalResources: 156,
  totalUsers: 284,
  totalDownloads: 1240,
  totalFavorites: 342,
  growth: {
    downloads: 23,
    users: 12,
    resources: 8,
  },
};

const recentActivities = [
  {
    id: 1,
    type: "download",
    user: "علی رضایی",
    resource: "Clean Code",
    time: "۵ دقیقه پیش",
  },
  {
    id: 2,
    type: "favorite",
    user: "مریم حسینی",
    resource: "JavaScript: The Good Parts",
    time: "۱۸ دقیقه پیش",
  },
  {
    id: 3,
    type: "download",
    user: "محمدرضا کریمی",
    resource: "Next.js 14 Mastery",
    time: "۱ ساعت پیش",
  },
  {
    id: 4,
    type: "search",
    user: "سارا محمدی",
    resource: 'جستجوی "TypeScript"',
    time: "۲ ساعت پیش",
  },
  {
    id: 5,
    type: "download",
    user: "احمد نوری",
    resource: "Design Patterns Cheat Sheet",
    time: "۳ ساعت پیش",
  },
];

export interface TimeRangeOption {
  value: string;
  label: string;
}

export const TIME_RANGE_OPTIONS: TimeRangeOption[] = [
  { value: "7", label: "۷ روز اخیر" },
  { value: "30", label: "۳۰ روز اخیر" },
  { value: "90", label: "۹۰ روز اخیر" },
  { value: "365", label: "یک سال اخیر" },
];


export default function AnalyticsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [timeRange, setTimeRange] = useState<string>("30");

  const handleTimeRangeChange = (val: string) => {
    setTimeRange(val);
  };

  return (
    <div className="space-y-6">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-4">
          <h1 className="text-3xl font-bold text-[#F5F5F5]">آمار و تحلیل</h1>
          <p className="text-gray-400 text-sm mt-1">
            مشاهده عملکرد و آمار کتابخانه
          </p>
        </div>
        <div className="flex flex-1 items-center gap-3">
          <CustomSelect
            options={TIME_RANGE_OPTIONS}
            value={timeRange}
            onChange={setTimeRange}
            className="min-w-40 flex"
          />
          <button className="bg-[#171717] h-fit border border-white/5 rounded-xl px-4 py-2 text-gray-400 hover:text-[#F5F5F5] transition text-sm flex items-center gap-2">
            <Filter size={16} />
            فیلتر
          </button>
        </div>
      </div>

      <StatsAnalytics statsData={statsData} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DownloadsChart />
        <UserGrowthChart />
        <CategoryChart />
        <PieChartComponent />
      </div>

      <PopularResourcesTable />

      <RecentActivities recentActivities={recentActivities} />
    </div>
  );
}