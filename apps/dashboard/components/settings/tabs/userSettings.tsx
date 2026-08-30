"use client";

import { useState } from "react";
import { Users, UserPlus, Shield, Clock } from "lucide-react";

export function UserSettings() {
  const [registration, setRegistration] = useState(true);
  const [defaultRole, setDefaultRole] = useState("user");
  const [twoFactor, setTwoFactor] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState("24");

  return (
    <div className="space-y-6">
      <h3 className="text-[#F5F5F5] font-medium">تنظیمات کاربران</h3>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          نقش پیش‌فرض کاربر جدید
        </label>
        <select
          value={defaultRole}
          onChange={(e) => setDefaultRole(e.target.value)}
          className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2.5 text-[#F5F5F5] focus:border-white/20 focus:outline-none transition"
        >
          <option value="user">کاربر</option>
          <option value="editor">نویسنده</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          مدت زمان نشست (ساعت)
        </label>
        <select
          value={sessionTimeout}
          onChange={(e) => setSessionTimeout(e.target.value)}
          className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2.5 text-[#F5F5F5] focus:border-white/20 focus:outline-none transition"
        >
          <option value="1">۱ ساعت</option>
          <option value="8">۸ ساعت</option>
          <option value="24">۲۴ ساعت</option>
          <option value="168">۷ روز</option>
        </select>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-[#0A0A0A] rounded-xl border border-white/5">
          <div className="flex items-center gap-3">
            <UserPlus size={18} className="text-gray-400" />
            <div>
              <p className="text-[#F5F5F5] text-sm">ثبت‌نام جدید</p>
              <p className="text-gray-500 text-xs">
                اجازه ثبت‌نام کاربران جدید
              </p>
            </div>
          </div>
          <button
            onClick={() => setRegistration(!registration)}
            className={`w-10 h-6 rounded-full transition ${
              registration ? "bg-purple-500" : "bg-white/10"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                registration ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-3 bg-[#0A0A0A] rounded-xl border border-white/5">
          <div className="flex items-center gap-3">
            <Shield size={18} className="text-gray-400" />
            <div>
              <p className="text-[#F5F5F5] text-sm">احراز هویت دو مرحله‌ای</p>
              <p className="text-gray-500 text-xs">فعال‌سازی برای حساب ادمین</p>
            </div>
          </div>
          <button
            onClick={() => setTwoFactor(!twoFactor)}
            className={`w-10 h-6 rounded-full transition ${
              twoFactor ? "bg-purple-500" : "bg-white/10"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                twoFactor ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
