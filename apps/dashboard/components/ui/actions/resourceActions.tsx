import { Resource } from "../../../../../packages/types/resource.type";
import { Edit, Trash2 } from "lucide-react";

interface TProps {
  resource: Resource;
  handleDelete: (resource: Resource) => void;
  handleEdit?: (resource: Resource) => void;
}

const ResourceActions = ({resource, handleDelete, handleEdit}: TProps) => {
  return (
    <div className="flex items-center justify-end gap-2/3 p-2 pt-0">
        <button
          onClick={() => handleEdit!(resource)}
          className="p-2 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 transition"
        >
          <Edit size={16} />
        </button>

      <button
        onClick={() => handleDelete(resource)}
        className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition"
        title="حذف"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
 
export default ResourceActions;