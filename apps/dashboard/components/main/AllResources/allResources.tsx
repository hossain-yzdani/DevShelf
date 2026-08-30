"use client";

import { Resource } from "@/types/Resource";
import { BookOpen, Grid3x3, List, Search } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import GridModeItem from "./gridModeItem";
import ListModeItem from "./listModeItem";

interface TProps {
  resources: Resource[];
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  viewMode: string;
  setViewMode: Dispatch<SetStateAction<"grid" | "list">>;
}

const AllResources = (props: TProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = props.resources.filter(
    (r) =>
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <h2 className="text-lg font-semibold text-[#F5F5F5]">همه منابع</h2>
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو..."
              className="w-48 sm:w-56 bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2 pr-10 text-[#F5F5F5] placeholder-gray-500 focus:border-white/20 focus:outline-none transition"
            />
          </div>
          {/* View toggle */}
          <div className="flex bg-[#0A0A0A] rounded-xl border border-white/10 p-1">
            <button
              onClick={() => props.setViewMode("grid")}
              className={`p-1.5 rounded-lg transition ${props.viewMode === "grid" ? "bg-[#171717] text-[#F5F5F5]" : "text-gray-500"}`}
            >
              <Grid3x3 size={16} />
            </button>
            <button
              onClick={() => props.setViewMode("list")}
              className={`p-1.5 rounded-lg transition ${props.viewMode === "list" ? "bg-[#171717] text-[#F5F5F5]" : "text-gray-500"}`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {props.loading ? (
        <div className="text-center py-12">
          <div className="w-8 h-8 border-2 border-[#F5F5F5]/20 border-t-[#F5F5F5] rounded-full animate-spin mx-auto" />
          <p className="text-gray-400 mt-3">در حال بارگذاری...</p>
        </div>
      ) : filteredResources.length === 0 ? (
        <div className="text-center py-12 bg-[#171717] rounded-xl border border-white/5">
          <BookOpen size={48} className="text-gray-600 mx-auto" />
          <p className="text-gray-400 mt-3">هیچ منبعی یافت نشد</p>
          <Link
            href="/resources/new"
            className="text-blue-400 hover:text-blue-300 text-sm mt-2 inline-block"
          >
            اولین منبع را اضافه کنید
          </Link>
        </div>
      ) : props.viewMode === "grid" ? (
        <GridModeItem filteredResources={filteredResources} />
      ) : (
        <ListModeItem filteredResources={filteredResources} />
      )}
    </div>
  );
};

export default AllResources;
