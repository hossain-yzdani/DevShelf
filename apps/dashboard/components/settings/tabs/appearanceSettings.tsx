"use client";

import { useState } from "react";
import { Moon, Sun, Palette, Type } from "lucide-react";

export function AppearanceSettings() {
  const [theme, setTheme] = useState("dark");
  const [color, setColor] = useState("purple");
  const [font, setFont] = useState("inter");

  const colors = [
    { value: "purple", label: "بنفش", class: "bg-purple-500" },
    { value: "blue", label: "آبی", class: "bg-blue-500" },
    { value: "green", label: "سبز", class: "bg-green-500" },
    { value: "amber", label: "کهربایی", class: "bg-amber-500" },
    { value: "red", label: "قرمز", class: "bg-red-500" },
    { value: "pink", label: "صورتی", class: "bg-pink-500" },
  ];

  const fonts = [
    { value: "inter", label: "Inter" },
    { value: "vazir", label: "Vazir" },
    { value: "sans", label: "Sans" },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-[#F5F5F5] font-medium">تنظیمات ظاهری</h3>

      {/* Theme */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          حالت نمایش
        </label>
        <div className="flex gap-3">
          <button
            onClick={() => setTheme("dark")}
            className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border transition ${
              theme === "dark"
                ? "border-purple-500 bg-purple-500/10 text-[#F5F5F5]"
                : "border-white/5 text-gray-400 hover:border-white/10"
            }`}
          >
            <Moon size={18} />
            دارک
          </button>
          <button
            onClick={() => setTheme("light")}
            className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border transition ${
              theme === "light"
                ? "border-purple-500 bg-purple-500/10 text-[#F5F5F5]"
                : "border-white/5 text-gray-400 hover:border-white/10"
            }`}
          >
            <Sun size={18} />
            روشن
          </button>
        </div>
      </div>

      {/* Primary Color */}
      <div>
        <label className="text-sm font-medium text-gray-300 mb-1.5 flex items-center gap-2">
          <Palette size={16} />
          رنگ اصلی
        </label>
        <div className="flex gap-2 flex-wrap">
          {colors.map((c) => (
            <button
              key={c.value}
              onClick={() => setColor(c.value)}
              className={`w-8 h-8 rounded-full transition ${
                color === c.value
                  ? "ring-2 ring-white ring-offset-2 ring-offset-[#171717]"
                  : "opacity-60 hover:opacity-100"
              }`}
              style={{ background: c.class.split(" ")[0] }}
            />
          ))}
        </div>
      </div>

      {/* Font */}
      <div>
        <label className="text-sm font-medium text-gray-300 mb-1.5 flex items-center gap-2">
          <Type size={16} />
          فونت
        </label>
        <select
          value={font}
          onChange={(e) => setFont(e.target.value)}
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
