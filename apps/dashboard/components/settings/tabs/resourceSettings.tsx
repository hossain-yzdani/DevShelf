"use client";

import { BookOpen, Download, Heart, Filter } from "lucide-react";

interface ResourceSettingsProps {
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

export function ResourceSettings({
  settings,
  getValue,
  setValue,
}: ResourceSettingsProps) {
  const resourceSettings = settings.resources || [];

  const findSetting = (key: string) =>
    resourceSettings.find((s: any) => s.key === key);

  const getCurrentValue = (key: string) => {
    const setting = findSetting(key);
    if (!setting) return undefined;
    return getValue(key, setting.value);
  };

  const toggles = [
    {
      key: "show_descriptions",
      icon: BookOpen,
      title: "نمایش توضیحات",
      description: "نمایش توضیحات کامل در لیست منابع",
    },
    {
      key: "allow_downloads",
      icon: Download,
      title: "فعال‌سازی دانلود",
      description: "اجازه دانلود منابع به کاربران",
    },
    {
      key: "allow_favorites",
      icon: Heart,
      title: "فعال‌سازی علاقه‌مندی‌ها",
      description: "اجازه ذخیره منابع به کاربران",
    },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-[#F5F5F5] font-medium">تنظیمات منابع</h3>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          تعداد آیتم در هر صفحه
        </label>
        <select
          value={getCurrentValue("items_per_page") ?? "20"}
          onChange={(e) => setValue("items_per_page", e.target.value)}
          className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2.5 text-[#F5F5F5] focus:border-white/20 focus:outline-none transition"
        >
          <option value="10">۱۰</option>
          <option value="20">۲۰</option>
          <option value="50">۵۰</option>
          <option value="100">۱۰۰</option>
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
            onToggle={() => setValue(toggle.key, !getCurrentValue(toggle.key))}
          />
        ))}
      </div>
    </div>
  );
}
