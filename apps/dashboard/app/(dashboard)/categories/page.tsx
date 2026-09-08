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
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[] | []>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [createModalOpen, setCreateModalOpen] = useState(false);

  const [savedCategory, setSavedCategory] = useState<Category | null>(null);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const filteredCategories = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  async function fetchData() {
    try {
      setLoading(true);
      const categories = await CategoriesApi.get(currentPage, 8);
      setTotalPages(categories.meta.totalPages);
      setCategories(categories.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [currentPage]);

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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

      <CategoriesGrid
        paginatedCategories={categories}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        loading={loading}
      />

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
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
