"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, X } from "lucide-react";
import { TagsApi } from "@/utils/tags/tags.api";
import { Tag } from "../../../../../packages/types/tag.type";


interface UpdateTagModalProps {
  isOpen: boolean;
  onClose: () => void;
  tag: Tag | null;
  onSuccess?: () => void;
  onUpdate: () => void;
}

export default function UpdateTagModal({
  isOpen,
  onClose,
  tag,
  onSuccess,
  onUpdate
}: UpdateTagModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
  });

  useEffect(() => {
    if (isOpen && tag) {
      setFormData({
        name: tag.name || "",
        slug: tag.slug || "",
        description: tag.description || "",
      });
    }
  }, [isOpen, tag]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const slug = formData.slug || generateSlug(formData.name);

    const payload = {
      name: formData.name,
      slug: slug,
      description: formData.description,
    };

    try {
      await TagsApi.update(tag?.slug || "", payload);
      if (onSuccess) onSuccess();
      onClose();
      onUpdate();
    } catch (err: any) {
      setError(err.message || "خطا در بروزرسانی تگ");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#171717] rounded-2xl border border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#171717] border-b border-white/5 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#F5F5F5] flex items-center gap-2">
              <Save size={24} />
              ویرایش تگ
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/5 transition text-gray-400 hover:text-[#F5F5F5]"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              ❌ {error}
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">
              نام تگ <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => {
                const name = e.target.value;
                setFormData({
                  ...formData,
                  name,
                  slug: generateSlug(name),
                });
              }}
              placeholder="مثال: NestJS"
              className="w-full bg-[#0A0A0A] border border-white/5 rounded-xl px-4 py-2.5 text-[#F5F5F5] focus:outline-none transition"
              required
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">
              اسلاگ <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
              placeholder="nestjs"
              className="w-full bg-[#0A0A0A] border border-white/5 rounded-xl px-4 py-2.5 text-[#F5F5F5] focus:outline-none transition"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">
              توضیحات <span className="text-red-400">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="توضیحات کامل تگ..."
              rows={3}
              className="w-full bg-[#0A0A0A] border border-white/5 rounded-xl px-4 py-2.5 text-[#F5F5F5] focus:outline-none transition resize-none"
              required
            />
          </div>

          {/* Footer */}
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
                  <Save size={20} /> بروزرسانی تگ
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}