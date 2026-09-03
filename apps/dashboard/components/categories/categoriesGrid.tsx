import { Category } from "../../../../packages/types";
import { FolderOpen } from "lucide-react";
import Actions from "../ui/actions/actions";
 
interface TProps {
  paginatedCategories: Category[];
  handleDelete: (id: string) => void;
}

const CategoriesGrid = ({ paginatedCategories, handleDelete }: TProps) => {
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

          <Actions resource={category} handleDelete={handleDelete} />
        </div>
      ))}
    </div>
  );
};

export default CategoriesGrid;
