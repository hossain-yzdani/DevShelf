"use client";

import { useState } from "react";
import { BookOpen, Download, Heart, Filter } from "lucide-react";

export function ResourceSettings() {
  const [itemsPerPage, setItemsPerPage] = useState("20");
  const [showDescriptions, setShowDescriptions] = useState(true);
  const [allowDownloads, setAllowDownloads] = useState(true);
  const [allowFavorites, setAllowFavorites] = useState(true);

  return (
    <div className="space-y-6">
      <h3 className="text-[#F5F5F5] font-medium">تنظیمات منابع</h3>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          تعداد آیتم در هر صفحه
        </label>
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(e.target.value)}
          className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2.5 text-[#F5F5F5] focus:border-white/20 focus:outline-none transition"
        >
          <option value="10">۱۰</option>
          <option value="20">۲۰</option>
          <option value="50">۵۰</option>
          <option value="100">۱۰۰</option>
        </select>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-[#0A0A0A] rounded-xl border border-white/5">
          <div className="flex items-center gap-3">
            <BookOpen size={18} className="text-gray-400" />
            <div>
              <p className="text-[#F5F5F5] text-sm">نمایش توضیحات</p>
              <p className="text-gray-500 text-xs">
                نمایش توضیحات کامل در لیست منابع
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowDescriptions(!showDescriptions)}
            className={`w-10 h-6 rounded-full transition ${
              showDescriptions ? "bg-purple-500" : "bg-white/10"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                showDescriptions ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-3 bg-[#0A0A0A] rounded-xl border border-white/5">
          <div className="flex items-center gap-3">
            <Download size={18} className="text-gray-400" />
            <div>
              <p className="text-[#F5F5F5] text-sm">فعال‌سازی دانلود</p>
              <p className="text-gray-500 text-xs">
                اجازه دانلود منابع به کاربران
              </p>
            </div>
          </div>
          <button
            onClick={() => setAllowDownloads(!allowDownloads)}
            className={`w-10 h-6 rounded-full transition ${
              allowDownloads ? "bg-purple-500" : "bg-white/10"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                allowDownloads ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-3 bg-[#0A0A0A] rounded-xl border border-white/5">
          <div className="flex items-center gap-3">
            <Heart size={18} className="text-gray-400" />
            <div>
              <p className="text-[#F5F5F5] text-sm">فعال‌سازی علاقه‌مندی‌ها</p>
              <p className="text-gray-500 text-xs">
                اجازه ذخیره منابع به کاربران
              </p>
            </div>
          </div>
          <button
            onClick={() => setAllowFavorites(!allowFavorites)}
            className={`w-10 h-6 rounded-full transition ${
              allowFavorites ? "bg-purple-500" : "bg-white/10"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                allowFavorites ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
