"use client";

import { useState } from "react";
import {
  FolderOpen,
} from "lucide-react";
import Header from "@/components/main/Header/Header";
import SearchBox from "@/components/ui/searchBox/searchBox";
import { Category } from "../../../../../packages/types";
import CategoriesGrid from "@/components/categories/categoriesGrid";
import { mockCategories } from "@/data/mockCategories";
import Pagination from "@/components/ui/pagination/pagination";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredCategories = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleDelete = (id: string) => {
    if (confirm("آیا از حذف این دسته‌بندی مطمئن هستید؟")) {
      setCategories(categories.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">

      <Header
        title="دسته‌بندی‌ها"
        description="مدیریت دسته‌بندی منابع"
        button=" دسته‌بندی جدید"
      />

      <SearchBox
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder="دسته بندی ها"
      />

      {paginatedCategories.length === 0 ? (
        <div className="text-center py-12 bg-[#171717] rounded-xl border border-white/5">
          <FolderOpen size={48} className="text-gray-600 mx-auto" />
          <p className="text-gray-400 mt-3">هیچ دسته‌بندی یافت نشد</p>
        </div>
      ) : (
        <CategoriesGrid
            paginatedCategories={paginatedCategories}
            handleDelete={handleDelete}
        />
      )}

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

    </div>
  );
}
