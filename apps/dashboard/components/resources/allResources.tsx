"use client";

import { Resource } from "../../../../packages/types/resource.type";
import { BookOpen } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import GridModeItem from "./gridModeItem";
import ListModeItem from "./listModeItem";
import GridModeSkeleton from "./skeletons/resources";

interface TProps {
  paginatedResources: Resource[];
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

  const filteredResources = props.paginatedResources.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
      r.author.toLowerCase().includes(props.searchQuery.toLowerCase());
    const matchesType =
      props.selectedType === "ALL" || r.type === props.selectedType;
    return matchesSearch && matchesType;
  });

  if (props.loading === true) {
    return <GridModeSkeleton />;
  }

  if (props.paginatedResources.length === 0) {
    return (
      <div className="text-center py-12 bg-[#171717] rounded-xl border border-white/5">
        <BookOpen size={48} className="text-gray-600 mx-auto" />
        <p className="text-gray-400 mt-3">هیچ منبعی یافت نشد</p>
      </div>
    );
  }

  return (
    <>
      {props.viewMode === "grid" ? (
        <GridModeItem
          paginatedResources={props.paginatedResources}
          handleDelete={props.handleDelete}
          handleEdit={props.handleEdit}
        />
      ) : (
        <ListModeItem
          paginatedResources={props.paginatedResources}
          handleDelete={props.handleDelete}
          handleEdit={props.handleEdit}
        />
      )}
    </>
  );
};

export default Resources;
