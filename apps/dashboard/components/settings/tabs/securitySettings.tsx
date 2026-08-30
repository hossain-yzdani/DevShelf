"use client";

import { useState } from "react";
import { Key, Shield, Lock, RefreshCw, Database } from "lucide-react";

export function SecuritySettings() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [ipList, setIpList] = useState("192.168.1.1, 10.0.0.1");
  const [auditLog, setAuditLog] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("رمزهای عبور مطابقت ندارند!");
      return;
    }
    alert("✅ رمز عبور با موفقیت تغییر کرد!");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="space-y-6">
      <h3 className="text-[#F5F5F5] font-medium">تنظیمات امنیت</h3>

      {/* Change Password */}
      <form
        onSubmit={handleChangePassword}
        className="p-4 bg-[#0A0A0A] rounded-xl border border-white/5 space-y-3"
      >
        <p className="text-sm text-gray-400 flex items-center gap-2">
          <Key size={16} />
          تغییر رمز عبور ادمین
        </p>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          placeholder="رمز فعلی"
          className="w-full bg-[#171717] border border-white/10 rounded-xl px-4 py-2.5 text-[#F5F5F5] placeholder-gray-500 focus:border-white/20 focus:outline-none transition"
          required
        />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="رمز جدید"
          className="w-full bg-[#171717] border border-white/10 rounded-xl px-4 py-2.5 text-[#F5F5F5] placeholder-gray-500 focus:border-white/20 focus:outline-none transition"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="تکرار رمز جدید"
          className="w-full bg-[#171717] border border-white/10 rounded-xl px-4 py-2.5 text-[#F5F5F5] placeholder-gray-500 focus:border-white/20 focus:outline-none transition"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-xl bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition text-sm"
        >
          تغییر رمز عبور
        </button>
      </form>

      {/* IP Whitelist */}
      <div>
        <label className="text-sm font-medium text-gray-300 mb-1.5 flex items-center gap-2">
          <Lock size={16} />
          IP‌های مجاز (جداسازی با کاما)
        </label>
        <input
          type="text"
          value={ipList}
          onChange={(e) => setIpList(e.target.value)}
          placeholder="192.168.1.1, 10.0.0.1"
          className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2.5 text-[#F5F5F5] placeholder-gray-500 focus:border-white/20 focus:outline-none transition"
        />
      </div>

      {/* Toggles */}
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-[#0A0A0A] rounded-xl border border-white/5">
          <div className="flex items-center gap-3">
            <RefreshCw size={18} className="text-gray-400" />
            <div>
              <p className="text-[#F5F5F5] text-sm">لاگ فعالیت‌ها</p>
              <p className="text-gray-500 text-xs">
                ثبت تمام فعالیت‌های کاربران
              </p>
            </div>
          </div>
          <button
            onClick={() => setAuditLog(!auditLog)}
            className={`w-10 h-6 rounded-full transition ${
              auditLog ? "bg-purple-500" : "bg-white/10"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                auditLog ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-3 bg-[#0A0A0A] rounded-xl border border-white/5">
          <div className="flex items-center gap-3">
            <Database size={18} className="text-gray-400" />
            <div>
              <p className="text-[#F5F5F5] text-sm">پشتیبان‌گیری خودکار</p>
              <p className="text-gray-500 text-xs">
                پشتیبان‌گیری روزانه از دیتابیس
              </p>
            </div>
          </div>
          <button
            onClick={() => setAutoBackup(!autoBackup)}
            className={`w-10 h-6 rounded-full transition ${
              autoBackup ? "bg-purple-500" : "bg-white/10"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                autoBackup ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
