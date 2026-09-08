import { BookOpen, Download, Edit, Trash2 } from "lucide-react";
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

const GridModeItem = ({
  paginatedResources,
  handleDelete,
  handleEdit,
}: TProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {paginatedResources.map((resource) => (
        <div
          key={resource.id}
          className="bg-[#171717] rounded-xl border border-white/5 hover:border-white/15 transition group overflow-hidden flex flex-col"
        >
          <Link
            href={`/resources/${resource.id}`}
            className="block p-4 pb-2 flex-1"
          >
            <div className="relative w-full aspect-2/3 rounded-lg bg-[#0A0A0A] flex items-center justify-center border border-white/5 mb-3 overflow-hidden shadow-lg">
              {resource.posterUrl ? (
                <Image
                  src={resource.posterUrl}
                  alt={resource.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 text-gray-600">
                  <BookOpen size={40} />
                  <span className="text-xs text-gray-500">بدون جلد</span>
                </div>
              )}

              <span
                className={`absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full ${typeColors[resource.type]} bg-black/70 backdrop-blur-sm border border-white/10`}
              >
                {typeLabels[resource.type]}
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-[#F5F5F5] font-medium text-sm line-clamp-2 group-hover:text-blue-400 transition leading-tight">
                {resource.name}
              </h3>
              <p className="text-gray-400 text-xs line-clamp-1">
                {resource.author}
              </p>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Download size={12} />
                  {resource.downloadsCount}
                </span>
                <span className="text-xs text-gray-500">
                  {resource.favoritesCount} ❤️
                </span>
              </div>
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
