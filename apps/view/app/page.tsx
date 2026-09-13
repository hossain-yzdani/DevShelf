"use client";

import { Send } from "lucide-react";

export default function LandingPage() {
  return (
    <div
      dir="rtl"
      className="relative min-h-screen flex items-center justify-center bg-[#0A0A0A] p-4"
    >
      {/* Glow Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-150 h-150 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-150 h-150 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative w-full max-w-100">
        <div className="bg-[#171717] rounded-2xl border border-white/5 p-8">
          {/* Logo + Title */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 border border-white/5 shrink-0">
              <img
                src="/logo/logoDevShelf.png"
                alt="DevShelf Logo"
                className="w-9 h-9 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-[#F5F5F5] leading-tight">
                کتابخانه برنامه‌نویسی DevShelf
              </h1>
              <p className="text-gray-400 text-xs mt-1">
                مرجع منابع متنی برنامه‌نویسی و کامپیوتر
              </p>
            </div>
          </div>

          <div className="h-px bg-white/5 mb-6" />

          {/* Description */}
          <p className="text-gray-400 text-[13px] leading-6 text-center mb-5">
            دسترسی سریع به کتاب‌ها، مقالات و خلاصه‌های حوزه برنامه‌نویسی و
            کامپیوتر — همه از طریق ربات تلگرام و کاملاً رایگان.
          </p>

          {/* Feature pills */}
          <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
            {["کتاب‌ها", "مقالات", "خلاصه‌ها"].map((item) => (
              <span
                key={item}
                className="text-[11px] text-gray-400 bg-white/5 border border-white/5 px-2.5 py-1 rounded-lg"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Telegram Button */}
          <a
            href="https://t.me/DevShelfBot"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-xl bg-[#F5F5F5] text-[#0A0A0A] font-medium hover:bg-[#F5F5F5]/90 transition flex items-center justify-center gap-2"
          >
            <Send size={18} />
            ورود به ربات تلگرام
          </a>

          <p className="text-center text-xs text-gray-500 mt-3" dir="ltr">
            @DevShelfBot
          </p>

          {/* Under development */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 animate-pulse" />
            سایت در حال توسعه است
          </div>
        </div>
      </div>
    </div>
  );
}
