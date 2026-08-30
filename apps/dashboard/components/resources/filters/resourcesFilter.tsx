import { CustomSelect } from "@/components/ui/customSelect/customSelect";
import { Resource }from "@/types/Resource";
import { Grid3x3, List, Search } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface TProps {
  viewMode: string;
  setViewMode: Dispatch<SetStateAction<"grid" | "list">>;

  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;

  selectedType: string;
  setSelectedType: Dispatch<
    SetStateAction<
      | "ALL"
      | "BOOK"
      | "COURSE"
      | "ARTICLE"
      | "CHEATSHEET"
      | "DOCUMENTATION"
      | "OTHER"
    >
  >;
}

const ResourcesFilter = (props: TProps) => {

  const typeOptions = [
    { value: "ALL", label: "همه انواع" },
    { value: "BOOK", label: "کتاب" },
    { value: "COURSE", label: "دوره" },
    { value: "ARTICLE", label: "مقاله" },
    { value: "CHEATSHEET", label: "خلاصه" },
    { value: "DOCUMENTATION", label: "مستندات" },
    { value: "OTHER", label: "سایر" },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        />
        <input
          type="text"
          value={props.searchQuery}
          onChange={(e) => props.setSearchQuery(e.target.value)}
          placeholder="جستجو در منابع..."
          className="w-full bg-[#171717] border border-white/5 rounded-xl px-4 py-2.5 pr-10 text-[#F5F5F5] placeholder-gray-500 focus:border-white/10 focus:outline-none transition"
        />
      </div>
      <div className="flex gap-2">
        <CustomSelect
          className="min-w-40 flex"
          options={typeOptions}
          value={props.selectedType}
          onChange={props.setSelectedType}
        />
        <div className="flex bg-[#171717] rounded-xl border border-white/5 p-1">
          <button
            onClick={() => props.setViewMode("grid")}
            className={`p-2 rounded-lg transition ${
              props.viewMode === "grid"
                ? "bg-[#0A0A0A] text-[#F5F5F5]"
                : "text-gray-500"
            }`}
          >
            <Grid3x3 size={16} />
          </button>
          <button
            onClick={() => props.setViewMode("list")}
            className={`p-2 rounded-lg transition ${
              props.viewMode === "list"
                ? "bg-[#0A0A0A] text-[#F5F5F5]"
                : "text-gray-500"
            }`}
          >
            <List size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourcesFilter;
