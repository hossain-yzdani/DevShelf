"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "کتاب", value: 45 },
  { name: "دوره", value: 28 },
  { name: "مقاله", value: 35 },
  { name: "خلاصه", value: 18 },
  { name: "مستندات", value: 22 },
];

const COLORS = ["#7c3aed", "#3b82f6", "#22c55e", "#f59e0b", "#ef4444"];

export function PieChartComponent() {
  return (
    <div className="bg-[#171717] rounded-xl border border-white/5 p-5">
      <h3 className="text-[#F5F5F5] font-medium mb-4">توزیع منابع</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
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
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#171717",
              borderColor: "#2a2a2a",
              color: "#F5F5F5",
              borderRadius: "10px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
