"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { ChartDataPoint } from "../../../../../packages/types/analytics";
import toPersianDate from "@/utils/toPersain/toPersianDate";

interface DownloadsChartProps {
  downloadsData?: ChartDataPoint[];
  userGrowthData?: ChartDataPoint[];
  title?: string;
}



export function DownloadsChart({
  downloadsData = [],
  userGrowthData = [],
  title = "دانلودها و رشد کاربران",
}: DownloadsChartProps) {
  const combinedData = downloadsData.map((item, index) => ({
    date: toPersianDate(item.date),
    downloads: parseInt(item.count, 10),
    users: parseInt(userGrowthData[index]?.count || "0", 10),
  }));

  if (combinedData.length === 0) {
    return (
      <div className="bg-[#171717] rounded-xl border border-white/5 p-5 flex items-center justify-center h-75">
        <p className="text-gray-400">داده‌ای برای نمایش وجود ندارد</p>
      </div>
    );
  }

  return (
    <div className="bg-[#171717] rounded-xl border border-white/5 p-5 pl-0">
      <h3 className="text-[#F5F5F5] font-medium mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={combinedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
          <XAxis dataKey="date" stroke="#666" fontSize={12} />
          <YAxis stroke="#666" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#171717",
              borderColor: "#2a2a2a",
              color: "#F5F5F5",
              borderRadius: "10px",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="downloads"
            stroke="#7c3aed"
            strokeWidth={2}
            dot={{ fill: "#7c3aed" }}
          />
          <Line
            type="monotone"
            dataKey="users"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: "#3b82f6" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
