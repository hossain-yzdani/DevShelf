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

const data = [
  { date: "۱۴۰۴/۰۱/۰۱", downloads: 12, users: 8 },
  { date: "۱۴۰۴/۰۱/۰۲", downloads: 18, users: 12 },
  { date: "۱۴۰۴/۰۱/۰۳", downloads: 10, users: 6 },
  { date: "۱۴۰۴/۰۱/۰۴", downloads: 25, users: 15 },
  { date: "۱۴۰۴/۰۱/۰۵", downloads: 30, users: 22 },
  { date: "۱۴۰۴/۰۱/۰۶", downloads: 22, users: 14 },
  { date: "۱۴۰۴/۰۱/۰۷", downloads: 35, users: 28 },
];

export function DownloadsChart() {
  return (
    <div className="bg-[#171717] rounded-xl border border-white/5 p-5 pl-0">
      <h3 className="text-[#F5F5F5] font-medium mb-4">
        دانلودها در ۷ روز اخیر
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
          <XAxis dataKey="date" stroke="#666" fontSize={12} />
          <YAxis dataKey="downloads" stroke="#666" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#171717",
              borderColor: "#2a2a2a",
              color: "#F5F5F5",
              borderRadius: '10px'
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
