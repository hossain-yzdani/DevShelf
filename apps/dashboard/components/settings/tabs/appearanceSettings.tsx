"use client";

import { Moon, Sun, Palette, Type } from "lucide-react";

interface AppearanceSettingsProps {
  settings: Record<string, any[]>;
  getValue: (key: string, dbValue: any) => any;
  setValue: (key: string, value: any) => void;
}

export function AppearanceSettings({
  settings,
  getValue,
  setValue,
}: AppearanceSettingsProps) {
  const appearanceSettings = settings.appearance || [];

  const findSetting = (key: string) =>
    appearanceSettings.find((s: any) => s.key === key);

  const getCurrentValue = (key: string) => {
    const setting = findSetting(key);
    if (!setting) return "";
    return getValue(key, setting.value);
  };

  const colors = [
    { value: "#8b5cf6", label: "بنفش" },
    { value: "#3b82f6", label: "آبی" },
    { value: "#22c55e", label: "سبز" },
    { value: "#f59e0b", label: "کهربایی" },
    { value: "#ef4444", label: "قرمز" },
    { value: "#ec4899", label: "صورتی" },
  ];

  const fonts = [
    { value: "inter", label: "Inter" },
    { value: "vazir", label: "Vazir" },
    { value: "sans", label: "Sans" },
  ];

  const themes = [
    { value: "dark", label: "دارک", icon: Moon },
    { value: "light", label: "روشن", icon: Sun },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-[#F5F5F5] font-medium">تنظیمات ظاهری</h3>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          حالت نمایش
        </label>
        <div className="flex gap-3">
          {themes.map((t) => {
            const Icon = t.icon;
            const isActive = getCurrentValue("theme") === t.value;

            return (
              <button
                key={t.value}
                onClick={() => setValue("theme", t.value)}
                className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border transition ${
                  isActive
                    ? "border-purple-500 bg-purple-500/10 text-[#F5F5F5]"
                    : "border-white/5 text-gray-400 hover:border-white/10"
                }`}
              >
                <Icon size={18} />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-300 mb-1.5 flex items-center gap-2">
          <Palette size={16} />
          رنگ اصلی
        </label>
        <div className="flex gap-2 flex-wrap">
          {colors.map((c) => {
            const isActive = getCurrentValue("primary_color") === c.value;

            return (
              <button
                key={c.value}
                onClick={() => setValue("primary_color", c.value)}
                className={`w-8 h-8 rounded-full transition ${
                  isActive
                    ? "ring-2 ring-white ring-offset-2 ring-offset-[#171717]"
                    : "opacity-60 hover:opacity-100"
                }`}
                style={{ background: c.value }}
                title={c.label}
              />
            );
          })}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-300 mb-1.5 flex items-center gap-2">
          <Type size={16} />
          فونت
        </label>
        <select
          value={getCurrentValue("font")}
          onChange={(e) => setValue("font", e.target.value)}
          className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2.5 text-[#F5F5F5] focus:border-white/20 focus:outline-none transition"
        >
          {fonts.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
