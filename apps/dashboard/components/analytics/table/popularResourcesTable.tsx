"use client";

import { Download, Heart, Eye } from "lucide-react";

const data = [
  {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    type: "کتاب",
    downloads: 1240,
    favorites: 342,
    views: 2450,
  },
  {
    id: 2,
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    type: "کتاب",
    downloads: 980,
    favorites: 280,
    views: 1890,
  },
  {
    id: 3,
    title: "Next.js 14 Mastery",
    author: "Hossain Yazdani",
    type: "دوره",
    downloads: 560,
    favorites: 120,
    views: 980,
  },
  {
    id: 4,
    title: "Design Patterns Cheat Sheet",
    author: "Unknown",
    type: "خلاصه",
    downloads: 320,
    favorites: 85,
    views: 620,
  },
  {
    id: 5,
    title: "TypeScript Deep Dive",
    author: "Basarat Ali Syed",
    type: "کتاب",
    downloads: 870,
    favorites: 195,
    views: 1560,
  },
];

export function PopularResourcesTable() {
  return (
    <div className="bg-[#171717] rounded-xl border border-white/5 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[#F5F5F5] font-medium">پرطرفدارترین منابع</h3>
        <button className="text-gray-400 hover:text-[#F5F5F5] text-sm transition">
          مشاهده همه
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead>
            <tr className="border-b border-white/5">
              <th className="px-3 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
                عنوان
              </th>
              <th className="px-3 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
                نویسنده
              </th>
              <th className="px-3 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
                نوع
              </th>
              <th className="px-3 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  <Download size={14} />
                  دانلود
                </div>
              </th>
              <th className="px-3 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  <Heart size={14} />
                  علاقه
                </div>
              </th>
              <th className="px-3 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  <Eye size={14} />
                  بازدید
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-white/5 transition">
                <td className="px-3 py-3 text-[#F5F5F5] text-sm font-medium">
                  {item.title}
                </td>
                <td className="px-3 py-3 text-gray-400 text-sm">{item.author}</td>
                <td className="px-3 py-3">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
                    {item.type}
                  </span>
                </td>
                <td className="px-3 py-3 text-gray-300 text-sm">{item.downloads.toLocaleString()}</td>
                <td className="px-3 py-3 text-gray-300 text-sm">{item.favorites}</td>
                <td className="px-3 py-3 text-gray-300 text-sm">{item.views.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}