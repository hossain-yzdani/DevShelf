"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { CategoryDataPoint } from "../../../../../packages/types/analytics";

const COLORS: Record<string, string> = {
  Programming: "#7c3aed",
  Design: "#3b82f6",
  DevOps: "#22c55e",
  "Data Science": "#f59e0b",
  Security: "#ef4444",
  default: "#6b7280",
};

interface CategoryChartProps {
  data?: CategoryDataPoint[];
  title?: string;
}

export function CategoryChart({
  data = [],
  title = "توزیع منابع بر اساس نوع",
}: CategoryChartProps) {
  if (data.length === 0) {
    return (
      <div className="bg-[#171717] rounded-xl border border-white/5 p-5 flex items-center justify-center h-75">
        <p className="text-gray-400">داده‌ای برای نمایش وجود ندارد</p>
      </div>
    );
  }

  const chartData = data.map((item) => ({
    category: item.category || "بدون دسته‌بندی",
    count: parseInt(item.count, 10) || 0,
    color: COLORS[item.category] || COLORS.default,
  }));

  return (
    <div className="bg-[#171717] rounded-xl border border-white/5 p-5">
      <h3 className="text-[#F5F5F5] font-medium mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
          <XAxis type="number" stroke="#666" fontSize={12} />
          <YAxis
            dataKey="category"
            type="category"
            stroke="#fff"
            fontSize={12}
            width={70}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#171717",
              borderColor: "#2a2a2a",
              color: "#F5F5F5",
              borderRadius: "10px",
            }}
            formatter={(value, name, props) => {
              const numValue = typeof value === "number" ? value : 0;
              return [`${numValue} منبع`, "تعداد"];
            }}
          />
          <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={20}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
