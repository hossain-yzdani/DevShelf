import { Resource } from "../../../../../packages/types/resource.type";
import { BookOpen, Download, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { typeColors, typeLabels } from "@/data/types";

interface TProps {
  filteredResources: Resource[];
}

const GridModeItem = ({filteredResources}: TProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredResources.map((resource) => (
        <Link
          key={resource.id}
          href={`/resources/${resource.id}`}
          className="bg-[#171717] rounded-xl p-5 border border-white/5 hover:border-white/10 transition group"
        >
          <div className="flex flex-col">
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
                className={`text-xs px-2 py-0.5 rounded-full ${typeColors[resource.type]}`}
              >
                {typeLabels[resource.type]}
              </span>
              <div className="flex items-center gap-2 text-gray-500 text-xs">
                <span className="flex items-center gap-1">
                  <Download size={12} />
                  {resource.downloadsCount}
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // TODO: Toggle favorite
                  }}
                  className="hover:text-red-400 transition"
                >
                  <Heart size={14} />
                </button>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
 
export default GridModeItem;