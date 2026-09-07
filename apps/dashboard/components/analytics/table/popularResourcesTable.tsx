"use client";

import { Download, Heart, Eye } from "lucide-react";
import { PopularResource } from "../../../../../packages/types/analytics";

interface PopularResourcesTableProps {
  data?: PopularResource[];
  title?: string;
  showViewAll?: boolean;
  onViewAll?: () => void;
}

export function PopularResourcesTable({
  data = [],
  title = "پرطرفدارترین منابع",
  showViewAll = true,
  onViewAll,
}: PopularResourcesTableProps) {
  if (data.length === 0) {
    return (
      <div className="bg-[#171717] rounded-xl border border-white/5 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#F5F5F5] font-medium">{title}</h3>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-400">داده‌ای برای نمایش وجود ندارد</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#171717] rounded-xl border border-white/5 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[#F5F5F5] font-medium">{title}</h3>
        {showViewAll && (
          <button
            onClick={onViewAll}
            className="text-gray-400 hover:text-[#F5F5F5] text-sm transition"
          >
            مشاهده همه
          </button>
        )}
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
              {/* <th className="px-3 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  <Eye size={14} />
                  بازدید
                </div>
              </th> */}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-white/5 transition">
                <td className="px-3 py-3 text-[#F5F5F5] text-sm font-medium">
                  {item.name}
                </td>
                <td className="px-3 py-3 text-gray-400 text-sm">
                  {item.author || "ناشناس"}
                </td>
                <td className="px-3 py-3">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
                    {item.type || "منبع"}
                  </span>
                </td>
                <td className="px-3 py-3 text-gray-300 text-sm">
                  {parseInt(item.downloads, 10).toLocaleString()}
                </td>
                <td className="px-3 py-3 text-gray-300 text-sm">
                  {parseInt(item.favorites, 10).toLocaleString()}
                </td>
                {/* <td className="px-3 py-3 text-gray-300 text-sm">
                  {parseInt(item.views, 10).toLocaleString()}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}