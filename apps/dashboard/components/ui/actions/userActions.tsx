import { Resource } from "../../../../../packages/types/resource.type";
import { User } from "../../../../../packages/types/user.type"
import { Tag } from "../../../../../packages/types/";
import { Category } from "../../../../../packages/types/";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";

interface TProps {
  resource: User;
  handleDelete: (id: string) => void;
  // handleEdit: (slug: string) => void;
}

const UserActions = ({resource, handleDelete}: TProps) => {
  return (
    <div className="flex items-center justify-end gap-2/3 p-2 pt-0">
      <button
        // onClick={() => handleEdit(resource?.id)}
        className="p-2 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 transition"
      >
        <Edit size={16} />
      </button>
      <button
        onClick={() => handleDelete(resource.id)}
        className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition"
        title="حذف"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
 
export default UserActions;