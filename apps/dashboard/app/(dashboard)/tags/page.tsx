"use client";

import { useState, useEffect } from "react";
import TagsGrid from "@/components/tags/tagsGrid";
import Header from "@/components/main/Header/Header";
import SearchBox from "@/components/ui/searchBox/searchBox";
import Pagination from "@/components/ui/pagination/pagination";
import { Tag } from "../../../../../packages/types/tag.type";
import { TagsApi } from "@/utils/tags/tags.api";
import { CategoriesApi } from "@/utils/category/categories.api";
import CreateTagModal from "@/components/tags/modals/createTag.modal";
import UpdateTagModal from "@/components/tags/modals/updateTag.modal";
import DeleteConfirmModal from "@/components/resources/modals/deleteResource.modal";

export default function TagsPage() {
  const [tags, setTags] = useState<Tag[] | []>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [createModalOpen, setCreateModalOpen] = useState(false);

  const [savedTag, setSavedTag] = useState<Tag | null>(null);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const filteredTags = tags.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.slug.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredTags.length / itemsPerPage);
  const paginatedTags = filteredTags.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  async function fetchData() {
    try {
      const tags = await TagsApi.getAll();
      setTags(tags);
    } catch (error) {
      console.error("Failed to fetch tags:", error);
    }
  }

  const handleEdit = (tag: Tag) => {
    setSavedTag(tag);
    setUpdateModalOpen(true);
  };

  const handleDelete = (tag: Tag) => {
    setSavedTag(tag);
    setDeleteModalOpen(true);
  };

  const deleteTag = async () => {
    try {
      if (!savedTag || !savedTag?.slug) {
        throw new Error("Saved Tag is not vallid");
      }
      const response = await TagsApi.delete(savedTag?.slug);
      setDeleteModalOpen(false);
      fetchData();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <Header
        title="تگ‌ها"
        description="مدیریت برچسب‌های منابع"
        button="تگ جدید"
        setOpen={() => setCreateModalOpen(true)}
      />

      <SearchBox
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder="تگ ها"
      />

      <TagsGrid
        paginatedTags={paginatedTags}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <CreateTagModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onUpdate={fetchData}
      />

      <UpdateTagModal
        tag={savedTag}
        isOpen={updateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        onUpdate={fetchData}
      />

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={deleteTag}
      />
      
    </div>
  );
}
