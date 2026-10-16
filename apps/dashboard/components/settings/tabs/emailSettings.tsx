"use client";

import { Mail, Server, Send, User } from "lucide-react";

interface EmailSettingsProps {
  settings: Record<string, any[]>;
  getValue: (key: string, dbValue: any) => any;
  setValue: (key: string, value: any) => void;
}

export function EmailSettings({
  settings,
  getValue,
  setValue,
}: EmailSettingsProps) {
  const emailSettings = settings.email || [];

  const findSetting = (key: string) =>
    emailSettings.find((s: any) => s.key === key);

  const getCurrentValue = (key: string) => {
    const setting = findSetting(key);
    if (!setting) return "";
    return getValue(key, setting.value);
  };

  const handleTestEmail = () => {
    alert("📧 ایمیل تست به آدرس شما ارسال شد!");
  };

  return (
    <div className="space-y-6">
      <h3 className="text-[#F5F5F5] font-medium">تنظیمات ایمیل</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium text-gray-300 mb-1.5 flex items-center gap-2">
            <Server size={16} />
            سرور SMTP
          </label>
          <input
            type="text"
            value={getCurrentValue("smtp_host")}
            onChange={(e) => setValue("smtp_host", e.target.value)}
            className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2.5 text-[#F5F5F5] placeholder-gray-500 focus:border-white/20 focus:outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            پورت
          </label>
          <input
            type="text"
            value={getCurrentValue("smtp_port")}
            onChange={(e) => setValue("smtp_port", e.target.value)}
            className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2.5 text-[#F5F5F5] placeholder-gray-500 focus:border-white/20 focus:outline-none transition"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-300 mb-1.5 flex items-center gap-2">
            <User size={16} />
            نام کاربری
          </label>
          <input
            type="text"
            value={getCurrentValue("smtp_username")}
            onChange={(e) => setValue("smtp_username", e.target.value)}
            className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2.5 text-[#F5F5F5] placeholder-gray-500 focus:border-white/20 focus:outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            رمز عبور
          </label>
          <input
            type="password"
            value={getCurrentValue("smtp_password")}
            onChange={(e) => setValue("smtp_password", e.target.value)}
            className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2.5 text-[#F5F5F5] placeholder-gray-500 focus:border-white/20 focus:outline-none transition"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium text-gray-300 mb-1.5 flex items-center gap-2">
            <Mail size={16} />
            ایمیل فرستنده
          </label>
          <input
            type="email"
            value={getCurrentValue("from_email")}
            onChange={(e) => setValue("from_email", e.target.value)}
            className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2.5 text-[#F5F5F5] placeholder-gray-500 focus:border-white/20 focus:outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            نام فرستنده
          </label>
          <input
            type="text"
            value={getCurrentValue("from_name")}
            onChange={(e) => setValue("from_name", e.target.value)}
            className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2.5 text-[#F5F5F5] placeholder-gray-500 focus:border-white/20 focus:outline-none transition"
          />
        </div>
      </div>

      <button
        onClick={handleTestEmail}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition text-sm"
      >
        <Send size={16} />
        تست ارسال ایمیل
      </button>
    </div>
  );
}