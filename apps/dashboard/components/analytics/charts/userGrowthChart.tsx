"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartDataPoint } from "../../../../../packages/types/analytics";
import toPersianDate from "@/utils/toPersain/toPersianDate";

const data = [
  { date: "۱۴۰۴/۰۱/۰۱", users: 8 },
  { date: "۱۴۰۴/۰۱/۰۲", users: 12 },
  { date: "۱۴۰۴/۰۱/۰۳", users: 18 },
  { date: "۱۴۰۴/۰۱/۰۴", users: 22 },
  { date: "۱۴۰۴/۰۱/０۵", users: 28 },
  { date: "۱۴۰۴/۰۱/۰۶", users: 35 },
  { date: "۱۴۰۴/۰۱/۰۷", users: 42 },
];

interface TProps {
  users: ChartDataPoint[];
}

export function UserGrowthChart({ users }: TProps) {
  const data = users.map((user, index) => ({
    date: toPersianDate(user.date),
    count: Number(user.count)
  }))

  return (
    <div className="bg-[#171717] rounded-xl border border-white/5 p-5">
      <h3 className="text-[#F5F5F5] font-medium mb-4">رشد کاربران</h3>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data}>
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
          <Area
            type="monotone"
            dataKey="count"
            stroke="#22c55e"
            fill="#22c55e"
            fillOpacity={0.15}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
