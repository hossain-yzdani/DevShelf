"use client";

import { useState } from "react";
import { Mail, Server, Send, User } from "lucide-react";

export function EmailSettings() {
  const [smtp, setSmtp] = useState({
    host: "smtp.gmail.com",
    port: "587",
    username: "",
    password: "",
    fromEmail: "noreply@devshelf.ir",
    fromName: "DevShelf",
  });

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
            value={smtp.host}
            onChange={(e) => setSmtp({ ...smtp, host: e.target.value })}
            className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2.5 text-[#F5F5F5] placeholder-gray-500 focus:border-white/20 focus:outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            پورت
          </label>
          <input
            type="text"
            value={smtp.port}
            onChange={(e) => setSmtp({ ...smtp, port: e.target.value })}
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
            value={smtp.username}
            onChange={(e) => setSmtp({ ...smtp, username: e.target.value })}
            className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2.5 text-[#F5F5F5] placeholder-gray-500 focus:border-white/20 focus:outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            رمز عبور
          </label>
          <input
            type="password"
            value={smtp.password}
            onChange={(e) => setSmtp({ ...smtp, password: e.target.value })}
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
            value={smtp.fromEmail}
            onChange={(e) => setSmtp({ ...smtp, fromEmail: e.target.value })}
            className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2.5 text-[#F5F5F5] placeholder-gray-500 focus:border-white/20 focus:outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            نام فرستنده
          </label>
          <input
            type="text"
            value={smtp.fromName}
            onChange={(e) => setSmtp({ ...smtp, fromName: e.target.value })}
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
