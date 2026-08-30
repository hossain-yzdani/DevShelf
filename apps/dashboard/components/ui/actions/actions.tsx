import { Category } from "@/types/Category";
import { Resource } from "@/types/Resource";
import { Tag } from "@/types/Tag";
import { User } from "@/types/User";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";

interface TProps {
  resource: Resource | Category | Tag | User;
  handleDelete: (id: string) => void;
}

const Actions = ({resource, handleDelete}: TProps) => {
  return (
    <div className="flex items-center justify-end gap-2/3 p-2 pt-0">
      <Link
        href={`/resources/edit/${resource.id}`}
        className="p-2 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 transition"
      >
        <Edit size={16} />
      </Link>
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
 
export default Actions;