"use client";

import { useState } from "react";
import { Key, Lock, RefreshCw, Database } from "lucide-react";

interface SecuritySettingsProps {
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

export function SecuritySettings({
  settings,
  getValue,
  setValue,
}: SecuritySettingsProps) {
  const securitySettings = settings.security || [];

  const findSetting = (key: string) =>
    securitySettings.find((s: any) => s.key === key);

  const getCurrentValue = (key: string) => {
    const setting = findSetting(key);
    if (!setting) return undefined;
    return getValue(key, setting.value);
  };

  const toggles = [
    {
      key: "audit_log",
      icon: RefreshCw,
      title: "لاگ فعالیت‌ها",
      description: "ثبت تمام فعالیت‌های کاربران",
    },
    {
      key: "auto_backup",
      icon: Database,
      title: "پشتیبان‌گیری خودکار",
      description: "پشتیبان‌گیری روزانه از دیتابیس",
    },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-[#F5F5F5] font-medium">تنظیمات امنیت</h3>

      {/* ─── IP Whitelist ─── */}
      <div>
        <label className="text-sm font-medium text-gray-300 mb-1.5 flex items-center gap-2">
          <Lock size={16} />
          IP‌های مجاز (جداسازی با کاما)
        </label>
        <input
          type="text"
          value={getCurrentValue("allowed_ips") ?? ""}
          onChange={(e) => setValue("allowed_ips", e.target.value)}
          placeholder="192.168.1.1, 10.0.0.1"
          className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2.5 text-[#F5F5F5] placeholder-gray-500 focus:border-white/20 focus:outline-none transition"
        />
      </div>

      {/* ─── Toggles ─── */}
      <div className="space-y-3">
        {toggles.map((toggle) => (
          <ToggleRow
            key={toggle.key}
            icon={toggle.icon}
            title={toggle.title}
            description={toggle.description}
            isActive={getCurrentValue(toggle.key) ?? false}
            onToggle={() => setValue(toggle.key, !getCurrentValue(toggle.key))}
          />
        ))}
      </div>
    </div>
  );
}
