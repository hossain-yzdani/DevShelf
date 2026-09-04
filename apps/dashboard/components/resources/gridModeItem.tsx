import { BookOpen, Download, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { typeLabels, typeColors } from "@/data/types";
import Actions from "../ui/actions/actions";
import { Resource } from "../../../../packages/types/resource.type";
import ResourceActions from "../ui/actions/resourceActions";

interface TProps {
  paginatedResources: Resource[];
  handleDelete: (resource: Resource) => void;
  handleEdit: (resource: Resource) => void;
}

const GridModeItem = ({
  paginatedResources,
  handleDelete,
  handleEdit,
}: TProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {paginatedResources.map((resource) => (
        <div
          key={resource.id}
          className="bg-[#171717] rounded-xl border border-white/5 hover:border-white/15 transition group overflow-hidden flex flex-col"
        >
          <Link
            href={`/resources/${resource.id}`}
            className="block p-5 pb-3 flex-1"
          >
            <div className="w-full aspect-video rounded-lg bg-[#0A0A0A] flex items-center justify-center text-4xl border border-white/5 mb-3 overflow-hidden">
              {resource.posterUrl ? (
                <Image
                  src={resource.posterUrl}
                  alt={resource.name}
                  width={300}
                  height={169}
                  className="object-cover"
                />
              ) : (
                <BookOpen size={32} className="text-gray-600" />
              )}
            </div>
            <h3 className="text-[#F5F5F5] font-medium line-clamp-1 group-hover:text-blue-400 transition">
              {resource.name}
            </h3>
            <p className="text-gray-400 text-sm line-clamp-1">
              {resource.author}
            </p>
            <div className="flex items-center justify-between mt-3">
              <span
                className={`text-xs px-2 py-0.5 rounded-full border ${typeColors[resource.type]}`}
              >
                {typeLabels[resource.type]}
              </span>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Download size={12} />
                {resource.downloadsCount}
              </span>
            </div>
          </Link>

          <ResourceActions
            resource={resource}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </div>
      ))}
    </div>
  );
};

export default GridModeItem;
