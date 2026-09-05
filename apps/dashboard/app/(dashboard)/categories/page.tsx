"use client";

import { useEffect, useState } from "react";
import { FolderOpen } from "lucide-react";
import Header from "@/components/main/Header/Header";
import SearchBox from "@/components/ui/searchBox/searchBox";
import { Category } from "../../../../../packages/types";
import CategoriesGrid from "@/components/categories/categoriesGrid";
import Pagination from "@/components/ui/pagination/pagination";
import { CategoriesApi } from "../../../utils/category/categories.api";
import CreateCategoryModal from "@/components/categories/modals/createCategory.modal";
import UpdateCategoryModal from "@/components/categories/modals/updateCategory.modal";
import DeleteConfirmModal from "@/components/resources/modals/deleteResource.modal";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[] | []>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [createModalOpen, setCreateModalOpen] = useState(false);

  const [savedCategory, setSavedCategory] = useState<Category | null>(null);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

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

  async function fetchData() {
    try {
      const categories = await CategoriesApi.getAll();
      setCategories(categories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (item: Category) => {
    setSavedCategory(item);
    setUpdateModalOpen(true);
  };

  const handleDelete = (item: Category) => {
    setSavedCategory(item);
    setDeleteModalOpen(true);
  };

  const deleteCategory = async () => {
    try {
      if (!savedCategory || !savedCategory?.slug) {
        throw new Error("Saved Cateogry is not vallid");
      }
      const response = await CategoriesApi.delete(savedCategory?.slug);
      setDeleteModalOpen(false);
      fetchData();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <Header
        title="دسته‌بندی‌ها"
        description="مدیریت دسته‌بندی منابع"
        button=" دسته‌بندی جدید"
        setOpen={setCreateModalOpen}
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
          handleEdit={handleEdit}
        />
      )}

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <CreateCategoryModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onUpdated={fetchData}
      />

      <UpdateCategoryModal
        isOpen={updateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        category={savedCategory}
        onUpdated={fetchData}
      />

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={deleteCategory}
      />
    </div>
  );
}
