"use client";

import { UserPlus, Shield } from "lucide-react";

interface UserSettingsProps {
  settings: Record<string, any[]>;
  getValue: (key: string, dbValue: any) => any;
  setValue: (key: string, value: any) => void;
}

interface ToggleRowProps {
  icon: React.ElementType;
  title: string;
  description: string;
  isActive: boolean;
  onToggle: () => void;
}

function ToggleRow({
  icon: Icon,
  title,
  description,
  isActive,
  onToggle,
}: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-[#0A0A0A] rounded-xl border border-white/5">
      <div className="flex items-center gap-3">
        <Icon size={18} className="text-gray-400" />
        <div>
          <p className="text-[#F5F5F5] text-sm">{title}</p>
          <p className="text-gray-500 text-xs">{description}</p>
        </div>
      </div>
      <button
        onClick={onToggle}
        className={`w-10 h-6 rounded-full transition ${
          isActive ? "bg-purple-500" : "bg-white/10"
        }`}
      >
        <div
          className={`w-4 h-4 rounded-full bg-white transition-transform ${
            isActive ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

export function UserSettings({
  settings,
  getValue,
  setValue,
}: UserSettingsProps) {
  const userSettings = settings.users || [];

  const findSetting = (key: string) =>
    userSettings.find((s: any) => s.key === key);

  const getCurrentValue = (key: string) => {
    const setting = findSetting(key);
    if (!setting) return undefined;
    return getValue(key, setting.value);
  };

  const roles = [
    { value: "user", label: "کاربر" },
    { value: "editor", label: "نویسنده" },
    { value: "moderator", label: "مدیر" },
  ];

  const sessionTimeouts = [
    { value: "1", label: "۱ ساعت" },
    { value: "8", label: "۸ ساعت" },
    { value: "24", label: "۲۴ ساعت" },
    { value: "168", label: "۷ روز" },
  ];

  const toggles = [
    {
      key: "allow_registration",
      icon: UserPlus,
      title: "ثبت‌نام جدید",
      description: "اجازه ثبت‌نام کاربران جدید",
    },
    {
      key: "two_factor_auth",
      icon: Shield,
      title: "احراز هویت دو مرحله‌ای",
      description: "فعال‌سازی برای حساب ادمین",
    },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-[#F5F5F5] font-medium">تنظیمات کاربران</h3>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          نقش پیش‌فرض کاربر جدید
        </label>
        <select
          value={getCurrentValue("default_role") ?? "user"}
          onChange={(e) => setValue("default_role", e.target.value)}
          className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2.5 text-[#F5F5F5] focus:border-white/20 focus:outline-none transition"
        >
          {roles.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          مدت زمان نشست (ساعت)
        </label>
        <select
          value={getCurrentValue("session_timeout") ?? "24"}
          onChange={(e) => setValue("session_timeout", e.target.value)}
          className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2.5 text-[#F5F5F5] focus:border-white/20 focus:outline-none transition"
        >
          {sessionTimeouts.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        {toggles.map((toggle) => (
          <ToggleRow
            key={toggle.key}
            icon={toggle.icon}
            title={toggle.title}
            description={toggle.description}
            isActive={getCurrentValue(toggle.key) ?? true}
            onToggle={() =>
              setValue(toggle.key, !getCurrentValue(toggle.key))
            }
          />
        ))}
      </div>
    </div>
  );
}