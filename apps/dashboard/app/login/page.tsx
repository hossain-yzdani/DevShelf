"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, LogIn, Shield } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      if (username === "admin" && password === "admin123") {
        router.push("/");
      } else {
        setError("نام کاربری یا رمز عبور اشتباه است");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-150 h-150 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-150 h-150 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative w-full max-w-100">
        <div className="text-center mb-8 flex itemx-center justify-center gap-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4">
            <Image src={"/logo/logoDevShelf.png"} alt="DevShelf Logo" />
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-[#F5F5F5]">DevShelf</h1>
            <p className="text-gray-400 text-sm mt-1">
              کتابخانه منابع برنامه‌نویسی
            </p>
          </div>
        </div>

        <div className="bg-[#171717] rounded-2xl border border-white/5 p-8">
          <h2 className="text-lg font-medium text-[#F5F5F5] mb-1 text-center">ورود</h2>
          <p className="text-gray-400 text-sm mb-6 text-center">
            برای دسترسی به پنل مدیریت وارد شوید
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-xl">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                نام کاربری
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="نام کاربری خود را وارد کنید"
                className="w-full px-4 py-2.5 rounded-xl bg-[#0A0A0A] border border-white/10 focus:border-white/20 focus:outline-none transition text-[#F5F5F5] placeholder-gray-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                رمز عبور
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="رمز عبور خود را وارد کنید"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0A0A0A] border border-white/10 focus:border-white/20 focus:outline-none transition text-[#F5F5F5] placeholder-gray-500 pl-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#F5F5F5] transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-xl bg-[#F5F5F5] text-[#0A0A0A] font-medium hover:bg-[#F5F5F5]/90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-[#0A0A0A]/20 border-t-[#0A0A0A] rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={18} />
                  ورود
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              حساب کاربری ندارید؟{" "}
              <Link
                href="/register"
                className="text-blue-400 hover:text-blue-300 transition"
              >
                ثبت‌نام کنید
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-600 mt-6">
          DevShelf v1.0.0
        </p>
      </div>
    </div>
  );
}
