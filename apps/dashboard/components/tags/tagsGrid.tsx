import { Tag as TypeTag } from "../../../../packages/types/tag.type";
import { Hash, Tag } from "lucide-react";
import TagActions from "../ui/actions/tagActions";
import TagsGridSkeleton from "./skeleton/tagsGris";

interface TProps {
  paginatedTags: TypeTag[];
  handleDelete: (tag: TypeTag) => void;
  handleEdit: (tag: TypeTag) => void;
  loading: boolean;
}

const TagsGrid = ({ paginatedTags, handleDelete, handleEdit, loading }: TProps) => {
  if (loading === true) {
    return <TagsGridSkeleton />
  }

  return (
    <>
      {paginatedTags.length === 0 ? (
        <div className="text-center py-12 bg-[#171717] rounded-xl border border-white/5">
          <Tag size={48} className="text-gray-600 mx-auto" />
          <p className="text-gray-400 mt-3">هیچ تگی یافت نشد</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {paginatedTags.map((tag) => (
            <div
              key={tag.id}
              className="bg-[#171717] rounded-xl border border-white/5 hover:border-white/15 transition group"
            >
              <div className="flex items-start justify-between p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0A0A0A] flex items-center justify-center text-lg border border-white/5 shrink-0">
                    <Hash size={18} className="text-gray-500" />
                  </div>
                  <div>
                    <h3 className="text-[#F5F5F5] font-medium">{tag.name}</h3>
                    <p className="text-gray-500 text-xs">#{tag.slug}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500 bg-[#0A0A0A] px-2 py-1 rounded-full shrink-0">
                  {tag.resources.length} منبع
                </span>
              </div>

              <TagActions
                tag={tag}
                handleDelete={handleDelete}
                handleEdit={handleEdit} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TagsGrid;
