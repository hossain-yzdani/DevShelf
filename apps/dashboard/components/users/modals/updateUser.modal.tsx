"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, X } from "lucide-react";
import { UsersApi } from "@/utils/users/users.api";
import { User } from "../../../../../packages/types/user.type";
import { CustomSelect } from "@/components/ui/customSelect/customSelect";
import { USER_ROLES } from "@/data/types";

interface UpdateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onSuccess?: () => void;
  onUpdated: () => void;
}

export default function UpdateUserModal({
  isOpen,
  onClose,
  user,
  onSuccess,
  onUpdated
}: UpdateUserModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    role: "USER",
    isActive: true,
  });

  useEffect(() => {
    if (isOpen && user) {
      setFormData({
        role: user.role || "USER",
        isActive: user.isActive ?? true,
      });
    }
  }, [isOpen, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await UsersApi.update(user?.id || "", {
        role: formData.role,
        isActive: formData.isActive,
      });
      if (onSuccess) onSuccess();
      onClose();
      onUpdated();
    } catch (err: any) {
      setError(err.message || "خطا در بروزرسانی کاربر");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !user) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#171717] rounded-2xl border border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 bg-[#171717] border-b border-white/5 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#F5F5F5] flex items-center gap-2">
              <Save size={24} />
              ویرایش کاربر
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/5 transition text-gray-400 hover:text-[#F5F5F5]"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              ❌ {error}
            </div>
          )}

          <div className="p-4 bg-[#0A0A0A] rounded-xl border border-white/5 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">نام کاربری:</span>
              <span className="text-[#F5F5F5]">{user.username}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">نام:</span>
              <span className="text-[#F5F5F5]">{user.firstName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">نام خانوادگی:</span>
              <span className="text-[#F5F5F5]">{user.lastName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">آیدی تلگرام:</span>
              <span className="text-[#F5F5F5]">{user.telegramId}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">
              نقش
            </label>
            <CustomSelect
              options={USER_ROLES.map((role) => ({
                value: role.value,
                label: role.label,
              }))}
              value={formData.role}
              onChange={(value: string) =>
                setFormData({ ...formData, role: value })
              }
              placeholder="انتخاب نقش..."
            />
          </div>

          <div>
            <label className="flex items-center gap-3 text-sm text-gray-400 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData({ ...formData, isActive: e.target.checked })
                }
                className="w-4 h-4 rounded border-white/20 bg-[#0A0A0A] focus:ring-offset-0"
              />
              کاربر فعال
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-[#F5F5F5] hover:bg-white/5 transition"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-[#F5F5F5] text-[#0A0A0A] font-medium hover:bg-[#F5F5F5]/90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  در حال بروزرسانی...
                </>
              ) : (
                <>
                  <Save size={20} /> بروزرسانی کاربر
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
