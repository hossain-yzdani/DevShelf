"use client";

import { useState } from "react";
import TagsGrid from "@/components/tags/tagsGrid";
import Header from "@/components/main/Header/Header";
import SearchBox from "@/components/ui/searchBox/searchBox";
import Pagination from "@/components/ui/pagination/pagination";

interface TagItem {
  id: string;
  name: string;
  slug: string;
  resourceCount: number;
  createdAt: string;
}

const mockTags: TagItem[] = [
  {
    id: "1",
    name: "جاوااسکریپت",
    slug: "javascript",
    resourceCount: 24,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "تایپ‌اسکریپت",
    slug: "typescript",
    resourceCount: 18,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "ری‌اکت",
    slug: "react",
    resourceCount: 15,
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "نکست‌جی‌اس",
    slug: "nextjs",
    resourceCount: 12,
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "نود‌جی‌اس",
    slug: "nodejs",
    resourceCount: 10,
    createdAt: new Date().toISOString(),
  },
  {
    id: "6",
    name: "پایتون",
    slug: "python",
    resourceCount: 8,
    createdAt: new Date().toISOString(),
  },
];

export default function TagsPage() {
  const [tags, setTags] = useState<TagItem[]>(mockTags);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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

  const handleDelete = (id: string) => {
    if (confirm("آیا از حذف این تگ مطمئن هستید؟")) {
      setTags(tags.filter((t) => t.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <Header
        title="تگ‌ها"
        description="مدیریت برچسب‌های منابع"
        button="تگ جدید"
      />

      <SearchBox
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder="تگ ها"
      />

      <TagsGrid paginatedTags={paginatedTags} handleDelete={handleDelete} />

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
