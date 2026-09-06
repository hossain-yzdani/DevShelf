import { FolderOpen } from "lucide-react";
import { Category } from "../../../../packages/types/category.type";
import CategoryActions from "../ui/actions/categoryActions";
import CategoriesGridSkeleton from "./skeletons/caregoriesGrid";

interface TProps {
  paginatedCategories: Category[];
  handleDelete: (item: Category) => void;
  handleEdit: (item: Category) => void;
  loading: boolean;
}

const CategoriesGrid = ({
  paginatedCategories,
  handleDelete,
  handleEdit,
  loading,
}: TProps) => {
  if (loading === true) {
    return <CategoriesGridSkeleton />;
  }

  if (paginatedCategories.length === 0) {
    return (
      <div className="text-center py-12 bg-[#171717] rounded-xl border border-white/5">
        <FolderOpen size={48} className="text-gray-600 mx-auto" />
        <p className="text-gray-400 mt-3">هیچ دسته‌بندی یافت نشد</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {paginatedCategories.map((category) => (
        <div
          key={category.id}
          className="bg-[#171717] rounded-xl border border-white/5 hover:border-white/15 transition group"
        >
          <div className="flex items-start justify-between p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0A0A0A] flex items-center justify-center text-xl border border-white/5 shrink-0">
                <FolderOpen size={18} className="text-gray-500" />
              </div>
              <div>
                <h3 className="text-[#F5F5F5] font-medium">{category.name}</h3>
                <p className="text-gray-400 text-sm line-clamp-1">
                  {category.description}
                </p>
              </div>
            </div>
            <span className="text-xs text-gray-500 bg-[#0A0A0A] px-2 py-1 rounded-full shrink-0">
              {category.resourcesCount} منبع
            </span>
          </div>

          <CategoryActions
            category={category}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </div>
      ))}
    </div>
  );
};

export default CategoriesGrid;
