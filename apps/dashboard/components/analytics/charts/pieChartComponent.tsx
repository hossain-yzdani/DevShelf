"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { CategoryDataPoint } from "../../../../../packages/types/analytics";

interface PieChartComponentProps {
  data?: CategoryDataPoint[];
  title?: string;
}

const COLORS = [
  "#7c3aed",
  "#3b82f6",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
  "#f97316",
];

export function PieChartComponent({
  data = [],
  title = "توزیع منابع",
}: PieChartComponentProps) {
  const chartData = data.map((item) => ({
    name: item.category || "بدون دسته‌بندی",
    value: parseInt(item.count, 10) || 0,
  }));

  if (chartData.length === 0) {
    return (
      <div className="bg-[#171717] rounded-xl border border-white/5 p-5 flex items-center justify-center h-75">
        <p className="text-gray-400">داده‌ای برای نمایش وجود ندارد</p>
      </div>
    );
  }

  const filteredData = chartData.filter((item) => item.value > 0);

  if (filteredData.length === 0) {
    return (
      <div className="bg-[#171717] rounded-xl border border-white/5 p-5 flex items-center justify-center h-75">
        <p className="text-gray-400">داده‌ای برای نمایش وجود ندارد</p>
      </div>
    );
  }

  return (
    <div className="bg-[#171717] rounded-xl border border-white/5 p-5">
      <h3 className="text-[#F5F5F5] font-medium mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={filteredData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            label={({ name, percent }) =>
              `${name} ${(percent! * 100).toFixed(0)}%`
            }
            labelLine={false}
          >
            {filteredData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#171717",
              borderColor: "#2a2a2a",
              color: "#F5F5F5",
              borderRadius: "10px",
            }}
            formatter={(value) => [`${value} منبع`, "تعداد"]}
          />
          <Legend
            verticalAlign="bottom"
            align="center"
            layout="horizontal"
            iconType="circle"
            wrapperStyle={{
              color: "#F5F5F5",
              fontSize: "12px",
              paddingTop: "10px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
