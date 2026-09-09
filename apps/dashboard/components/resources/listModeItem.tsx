import { BookOpen, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { typeLabels, typeColors } from "@/data/types";
import { Resource } from "../../../../packages/types/resource.type";
import ResourceActions from "../ui/actions/resourceActions";

interface TProps {
  paginatedResources: Resource[];
  handleDelete: (resource: Resource) => void;
  handleEdit: (resource: Resource) => void;
}

const ListModeItem = ({
  paginatedResources,
  handleDelete,
  handleEdit,
}: TProps) => {
  return (
    <div className="space-y-3">
      {paginatedResources.map((resource) => (
        <div
          key={resource.id}
          className="bg-[#171717] rounded-xl border border-white/5 hover:border-white/15 transition group overflow-hidden"
        >
          <div className="flex items-center gap-5 p-4">
            <Link href={`/resources/${resource.id}`} className="shrink-0">
              <div className="relative w-16 h-24 rounded-lg bg-[#0A0A0A] border border-white/5 overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                {resource.posterUrl ? (
                  <Image
                    src={resource.posterUrl}
                    alt={resource.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="64px"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-1 text-gray-600">
                    <BookOpen size={24} />
                    <span className="text-[8px] text-gray-500">بدون جلد</span>
                  </div>
                )}
              </div>
            </Link>

            <Link href={`/resources/${resource.id}`} className="flex-1 min-w-0">
              <h3 className="text-[#F5F5F5] font-medium group-hover:text-blue-400 transition line-clamp-1">
                {resource.name}
              </h3>
              <p className="text-gray-400 text-sm line-clamp-1">
                {resource.author}
              </p>

              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full border ${typeColors[resource.type]}`}
                >
                  {typeLabels[resource.type]}
                </span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Download size={12} />
                  {resource.downloadsCount}
                </span>
                <span className="text-xs text-gray-500">
                  ❤️ {resource.favoritesCount}
                </span>
              </div>
            </Link>

            <div className="shrink-0">
              <ResourceActions
                resource={resource}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListModeItem;
