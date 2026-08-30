"use client";

import { useState } from "react";
import Header from "@/components/main/Header/Header";
import mockResources from "@/data/mockResources";
import { Resource } from "@/types/Resource";
import Resources from "@/components/resources/allResources";
import ResourcesFilter from "@/components/resources/filters/resourcesFilter";
import Pagination from "@/components/ui/pagination/pagination";

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>(mockResources);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<Resource["type"] | "ALL">(
    "ALL",
  );
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = 10;

  const handleDelete = (id: string) => {
    if (confirm("آیا از حذف این منبع مطمئن هستید؟")) {
      setResources(resources.filter((r) => r.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <Header
        title="منابع"
        description="مدیریت منابع آموزشی و کتاب‌ها"
        button="منبع جدید"
      />

      <ResourcesFilter
        viewMode={viewMode}
        setViewMode={setViewMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />

      <Resources
        resources={resources}
        loading={loading}
        setLoading={setLoading}
        viewMode={viewMode}
        setViewMode={setViewMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        handleDelete={handleDelete}
      />

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
