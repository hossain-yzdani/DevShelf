"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Resource } from "../../../../../packages/types/resource.type";
import { CategoriesApi } from "@/utils/category/categories.api";
import { TagsApi } from "@/utils/tags/tags.api";
import { CustomSelect } from "@/components/ui/customSelect/customSelect";
import { MultiSelect } from "@/components/ui/customSelect/multySelect";
import { Plus } from "lucide-react";

interface CreateResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const RESOURCE_TYPES = [
  {
    value: "BOOK",
    label: "کتاب",
  },
  {
    value: "VIDEO",
    label: "ویدیو",
  },
  {
    value: "COURSE",
    label: "دوره",
  },
  {
    value: "ARTICLE",
    label: "مقاله",
  },
  {
    value: "AUDIO",
    label: "صوتی",
  },
];

export default function CreateResourceModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateResourceModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "" as string | "",
    author: "",
    fileUrl: "",
    posterUrl: "",
    category: "",
    tagIds: [] as string[],
  });

  const [categories, setCategories] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showTagDropdown, setShowTagDropdown] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const loadData = async () => {
        try {
          const [cats, tgs] = await Promise.all([
            CategoriesApi.getAll(),
            TagsApi.getAll(),
          ]);
          setCategories(cats);
          setTags(tgs);
        } catch (error) {
          console.error("Error loading data:", error);
        }
      };
      loadData();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("Resource created:", formData);

      setFormData({
        name: "",
        description: "",
        type: "",
        author: "",
        fileUrl: "",
        posterUrl: "",
        category: "",
        tagIds: [],
      });

      if (onSuccess) onSuccess();
      onClose();
      router.refresh();
    } catch (err: any) {
      setError(err.message || "خطا در ایجاد منبع");
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
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#171717] rounded-2xl border border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#171717] border-b border-white/5 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#F5F5F5]">
              <span className="ml-2"><Plus size={24} /></span>
              منبع جدید
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/5 transition text-gray-400 hover:text-[#F5F5F5]"
            >
              <Plus size={20} rotate={45} />
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
              نام منبع <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="مثال: Mastering NestJS"
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
              placeholder="توضیحات کامل منبع..."
              rows={3}
              className="w-full bg-[#0A0A0A] border border-white/5 rounded-xl px-4 py-2.5 text-[#F5F5F5] focus:outline-none transition resize-none"
              required
            />
          </div>

          {/* Type + Author */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">
                نوع <span className="text-red-400">*</span>
              </label>
              <CustomSelect
                options={RESOURCE_TYPES}
                value={formData.type}
                onChange={(value: string) =>
                  setFormData({
                    ...formData,
                    type: value,
                  })
                }
                placeholder="انتخاب نوع..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">
                نویسنده <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
                placeholder="نام نویسنده"
                className="w-full bg-[#0A0A0A] border border-white/5 rounded-xl px-4 py-2.5 text-[#F5F5F5] focus:outline-none transition"
                required
              />
            </div>
          </div>

          {/* File URL + Poster URL */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">
                لینک فایل <span className="text-red-400">*</span>
              </label>
              <input
                type="url"
                value={formData.fileUrl}
                onChange={(e) =>
                  setFormData({ ...formData, fileUrl: e.target.value })
                }
                placeholder="https://example.com/file.pdf"
                className="w-full bg-[#0A0A0A] border border-white/5 rounded-xl px-4 py-2.5 text-[#F5F5F5] focus:outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">
                لینک پوستر
              </label>
              <input
                type="url"
                value={formData.posterUrl}
                onChange={(e) =>
                  setFormData({ ...formData, posterUrl: e.target.value })
                }
                placeholder="https://example.com/poster.jpg"
                className="w-full bg-[#0A0A0A] border border-white/5 rounded-xl px-4 py-2.5 text-[#F5F5F5] focus:outline-none transition"
              />
            </div>
          </div>

          {/* Category + Tags */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-400 mb-1.5">
                دسته‌بندی <span className="text-red-400">*</span>
              </label>
              <CustomSelect
                options={categories.map((cat) => ({
                  value: cat.id,
                  label: cat.name,
                }))}
                onChange={(value: any) => {
                  setFormData({ ...formData, category: value });
                }}
                value={formData.category}
                placeholder="انتخاب دسته‌بندی..."
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-400 mb-1.5">
                تگ‌ها
              </label>
              <MultiSelect
                options={tags.map((tag) => ({
                  value: tag.id,
                  label: tag.name,
                }))}
                value={formData.tagIds}
                onChange={(newValue) =>
                  setFormData({ ...formData, tagIds: newValue })
                }
                placeholder="تگ‌ها را انتخاب کنید..."
                className="w-full"
              />
            </div>
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
                  در حال ایجاد...
                </>
              ) : (
                <>
                  <Plus size={20} /> ایجاد منیع
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
