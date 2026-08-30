"use client";

export function GeneralSettings() {
  return (
    <div className="space-y-4">
      <h3 className="text-[#F5F5F5] font-medium">تنظیمات عمومی</h3>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">عنوان سایت</label>
          <input
            type="text"
            defaultValue="DevShelf"
            className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2.5 text-[#F5F5F5] placeholder-gray-500 focus:border-white/20 focus:outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">توضیحات سایت</label>
          <textarea
            defaultValue="کتابخانه منابع برنامه‌نویسی"
            rows={3}
            className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2.5 text-[#F5F5F5] placeholder-gray-500 focus:border-white/20 focus:outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">لوگو</label>
          <input type="file" accept="image/*" className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2.5 text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-500/20 file:text-purple-400 file:cursor-pointer hover:file:bg-purple-500/30" />
        </div>
      </div>
    </div>
  );
}