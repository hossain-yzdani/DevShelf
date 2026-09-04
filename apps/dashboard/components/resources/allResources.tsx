"use client";

import { Resource } from "../../../../packages/types/resource.type";
import { BookOpen } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import GridModeItem from "./gridModeItem";
import ListModeItem from "./listModeItem";

interface TProps {
  resources: Resource[];
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  viewMode: string;
  setViewMode: Dispatch<SetStateAction<"grid" | "list">>;

  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;

  selectedType: string;
  setSelectedType: Dispatch<SetStateAction<"ALL" | Resource["type"]>>;

  handleDelete: (resource: Resource) => void;
  handleEdit: (resource: Resource) => void;
}

const Resources = (props: TProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredResources = props.resources.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
      r.author.toLowerCase().includes(props.searchQuery.toLowerCase());
    const matchesType =
      props.selectedType === "ALL" || r.type === props.selectedType;
    return matchesSearch && matchesType;
  });

  const paginatedResources = filteredResources.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <>
      {props.loading ? (
        <div className="text-center py-12">
          <div className="w-8 h-8 border-2 border-[#F5F5F5]/20 border-t-[#F5F5F5] rounded-full animate-spin mx-auto" />
          <p className="text-gray-400 mt-3">در حال بارگذاری...</p>
        </div>
      ) : paginatedResources.length === 0 ? (
        <div className="text-center py-12 bg-[#171717] rounded-xl border border-white/5">
          <BookOpen size={48} className="text-gray-600 mx-auto" />
          <p className="text-gray-400 mt-3">هیچ منبعی یافت نشد</p>
        </div>
      ) : props.viewMode === "grid" ? (
        <GridModeItem
          paginatedResources={paginatedResources}
          handleDelete={props.handleDelete}
          handleEdit={props.handleEdit}
        />
      ) : (
        <ListModeItem
          paginatedResources={paginatedResources}
          handleDelete={props.handleDelete}
          handleEdit={props.handleEdit}
        />
      )}
    </>
  );
};

export default Resources;
