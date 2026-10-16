"use client";

import { Code, AlertTriangle, Trash2 } from "lucide-react";

interface AdvancedSettingsProps {
  settings: Record<string, any[]>;
  getValue: (key: string, dbValue: any) => any;
  setValue: (key: string, value: any) => void;
}

export function AdvancedSettings({
  settings,
  getValue,
  setValue,
}: AdvancedSettingsProps) {
  const advancedSettings = settings.advanced || [];

  const findSetting = (key: string) =>
    advancedSettings.find((s: any) => s.key === key);

  const getCurrentValue = (key: string) => {
    const setting = findSetting(key);
    if (!setting) return "";
    return getValue(key, setting.value);
  };

  const handleResetData = () => {
    if (
      confirm(
        "⚠️ آیا از پاک کردن تمام دیتاهای تستی مطمئن هستید؟ این عمل غیرقابل بازگشت است.",
      )
    ) {
      alert("🗑️ دیتاهای تستی با موفقیت پاک شدند!");
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-[#F5F5F5] font-medium">تنظیمات پیشرفته</h3>

      <div>
        <label className="text-sm font-medium text-gray-300 mb-1.5 flex items-center gap-2">
          <Code size={16} />
          کد هدر
        </label>
        <textarea
          value={getCurrentValue("header_code")}
          onChange={(e) => setValue("header_code", e.target.value)}
          rows={3}
          placeholder="<!-- کدهای هدر -->"
          className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2.5 text-[#F5F5F5] placeholder-gray-500 focus:border-white/20 focus:outline-none transition font-mono text-sm"
        />
        <p className="text-xs text-gray-500 mt-1">
          کدهای تزریقی به هدر سایت (مثل گوگل آنالیتیکس)
        </p>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-300 mb-1.5 flex items-center gap-2">
          <Code size={16} />
          کد فوتر
        </label>
        <textarea
          value={getCurrentValue("footer_code")}
          onChange={(e) => setValue("footer_code", e.target.value)}
          rows={3}
          placeholder="<!-- کدهای فوتر -->"
          className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2.5 text-[#F5F5F5] placeholder-gray-500 focus:border-white/20 focus:outline-none transition font-mono text-sm"
        />
        <p className="text-xs text-gray-500 mt-1">کدهای تزریقی به فوتر سایت</p>
      </div>

      <div className="flex items-center justify-between p-3 bg-[#0A0A0A] rounded-xl border border-white/5">
        <div className="flex items-center gap-3">
          <AlertTriangle size={18} className="text-amber-400" />
          <div>
            <p className="text-[#F5F5F5] text-sm">حالت نگهداری</p>
            <p className="text-gray-500 text-xs">
              سایت برای کاربران عادی غیرفعال می‌شود
            </p>
          </div>
        </div>
        <button
          onClick={() =>
            setValue("maintenance_mode", !getCurrentValue("maintenance_mode"))
          }
          className={`w-10 h-6 rounded-full transition ${
            getCurrentValue("maintenance_mode") ? "bg-amber-500" : "bg-white/10"
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full bg-white transition-transform ${
              getCurrentValue("maintenance_mode")
                ? "translate-x-5"
                : "translate-x-0.5"
            }`}
          />
        </button>
      </div>

      <div className="pt-4 border-t border-white/5">
        <button
          onClick={handleResetData}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition text-sm"
        >
          <Trash2 size={16} />
          پاک کردن دیتاهای تستی
        </button>
        <p className="text-xs text-gray-500 mt-2">
          ⚠️ این عملیات غیرقابل بازگشت است
        </p>
      </div>
    </div>
  );
}
