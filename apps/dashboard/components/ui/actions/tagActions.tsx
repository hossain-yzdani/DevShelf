import { Edit, Trash2 } from "lucide-react";
import { Tag } from "../../../../../packages/types/tag.type";

interface TProps {
  tag: Tag;
  handleDelete: (tag: Tag) => void;
  handleEdit: (tag: Tag) => void;
}

const TagActions = ({tag, handleDelete, handleEdit}: TProps) => {
  return (
    <div className="flex items-center justify-end gap-2/3 p-2 pt-0">
        <button
          onClick={() => handleEdit!(tag)}
          className="p-2 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 transition"
        >
          <Edit size={16} />
        </button>

      <button
        onClick={() => handleDelete(tag)}
        className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition"
        title="حذف"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
 
export default TagActions;