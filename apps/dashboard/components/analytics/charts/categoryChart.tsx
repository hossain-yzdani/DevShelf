"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { category: "کتاب", count: 45 },
  { category: "دوره", count: 28 },
  { category: "مقاله", count: 35 },
  { category: "خلاصه", count: 18 },
  { category: "مستندات", count: 22 },
  { category: "سایر", count: 8 },
];

export function CategoryChart() {
  return (
    <div className="bg-[#171717] rounded-xl border border-white/5 p-5">
      <h3 className="text-[#F5F5F5] font-medium mb-4">
        توزیع منابع بر اساس نوع
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
          <XAxis type="number" stroke="#666" fontSize={12} />
          <YAxis
            dataKey="category"
            type="category"
            stroke="#666"
            fontSize={12}
            width={60}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#171717",
              borderColor: "#2a2a2a",
              color: "#F5F5F5",
              borderRadius: "10px",
            }}
          />
          <Bar dataKey="count" fill="#7c3aed" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
