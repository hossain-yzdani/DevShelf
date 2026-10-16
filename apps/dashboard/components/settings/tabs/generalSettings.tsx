"use client";

interface GeneralSettingsProps {
  settings: Record<string, any[]>;
  getValue: (key: string, dbValue: any) => any;
  setValue: (key: string, value: any) => void;
}

export function GeneralSettings({
  settings,
  getValue,
  setValue,
}: GeneralSettingsProps) {
  const generalSettings = settings.general || [];

  const findSetting = (key: string) =>
    generalSettings.find((s: any) => s.key === key);

  const getCurrentValue = (key: string) => {
    const setting = findSetting(key);
    if (!setting) return "";
    return getValue(key, setting.value);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-[#F5F5F5] font-medium">تنظیمات عمومی</h3>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            عنوان سایت
          </label>
          <input
            type="text"
            value={getCurrentValue("site_title")}
            onChange={(e) => setValue("site_title", e.target.value)}
            className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2.5 text-[#F5F5F5] placeholder-gray-500 focus:border-white/20 focus:outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            توضیحات سایت
          </label>
          <textarea
            value={getCurrentValue("site_description")}
            onChange={(e) => setValue("site_description", e.target.value)}
            rows={3}
            className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2.5 text-[#F5F5F5] placeholder-gray-500 focus:border-white/20 focus:outline-none transition"
          />
        </div>

        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={getCurrentValue("maintenance_mode")}
                onChange={(e) => setValue("maintenance_mode", e.target.checked)}
                className="peer sr-only"
              />
              <div className="w-12 h-6 rounded-full bg-white/10 peer-checked:bg-purple-500/40 transition-all" />
              <div className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-gray-400 peer-checked:bg-purple-500 peer-checked:translate-x-6 transition-all" />
            </div>
            <span className="text-sm text-gray-300">
              حالت تعمیر (Maintenance Mode)
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
