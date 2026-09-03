import { BookOpen, Download, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { typeLabels, typeColors } from "@/data/types";
import Actions from "../ui/actions/actions";
import { Resource } from "../../../../packages/types/resource.type";

interface TProps {
  paginatedResources: Resource[];
  handleDelete: (id: string) => void;
}

const ListModeItem = ({ paginatedResources, handleDelete }: TProps) => {
  return (
    <div className="space-y-3">
      {paginatedResources.map((resource) => (
        <div
          key={resource.id}
          className="bg-[#171717] rounded-xl border border-white/5 hover:border-white/15 transition group"
        >
          <div className="flex items-center gap-4 p-4 pb-0">
            <Link
              href={`/resources/${resource.id}`}
              className="flex items-center gap-4 flex-1 min-w-0"
            >
              <div className="w-12 h-16 rounded-lg bg-[#0A0A0A] flex items-center justify-center text-xl border border-white/5 shrink-0">
                {resource.posterUrl ? (
                  <Image
                    src={resource.posterUrl}
                    alt={resource.name}
                    width={48}
                    height={64}
                    className="rounded-lg object-cover"
                  />
                ) : (
                  <BookOpen size={20} className="text-gray-600" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[#F5F5F5] font-medium group-hover:text-blue-400 transition">
                  {resource.name}
                </h3>
                <p className="text-gray-400 text-sm">{resource.author}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
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
          </div>

          <Actions resource={resource} handleDelete={handleDelete} />
        </div>
      ))}
    </div>
  );
};

export default ListModeItem;
