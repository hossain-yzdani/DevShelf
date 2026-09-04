"use client";

import { useState, useEffect } from "react";
import Header from "@/components/main/Header/Header";
import Resources from "@/components/resources/allResources";
import { Resource } from "../../../../../packages/types/resource.type";
import ResourcesFilter from "@/components/resources/filters/resourcesFilter";
import Pagination from "@/components/ui/pagination/pagination";
import { ResourcesApi } from "@/utils/resources/resource.api";
import CreateResourceModal from "@/components/resources/modals/createResource.modal";
import UpdateResourceModal from "@/components/resources/modals/updateResource.modal";
import DeleteConfirmModal from "@/components/resources/modals/delteResource.modal";

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[] | []>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<Resource["type"] | "ALL">(
    "ALL",
  );
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [createModalOpen, setCreateModalOpen] = useState(false);

  const [savedResource, setSavedResource] = useState<Resource | null>(null);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const totalPages = 1;

  const fetchData = async () => {
    try {
      const resources = await ResourcesApi.getAll();
      setResources(resources);
    } catch (error) {
      return;
    }
  };

  const handleEdit = async (resource: Resource) => {
    setSavedResource(resource);
    setUpdateModalOpen(true);
  };

  const handleDelete = (resource: Resource) => {
    setSavedResource(resource);
    setDeleteModalOpen(true);
  };

  const deleteResource = async () => {
    try {
      if (!savedResource || !savedResource?.slug) {
        throw new Error("Saved Resource is not vallid");
      }
      const response = await ResourcesApi.delete(savedResource?.slug);
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
        title="منابع"
        description="مدیریت منابع آموزشی و کتاب‌ها"
        button="منبع جدید"
        setOpen={setCreateModalOpen}
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
        handleEdit={handleEdit}
      />

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <CreateResourceModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onUpdated={fetchData}
      />

      <UpdateResourceModal
        isOpen={updateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        resource={savedResource}
        onUpdated={fetchData}
      />

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={deleteResource}
      />
    </div>
  );
}
