import { Resource } from "../../../../../packages/types/resource.type";
import { BookOpen, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface TProps {
  featuredResources: Resource[];
  typeColors: Record<Resource["type"], string>;
  typeLabels: Record<Resource["type"], string>;
}

const FeaturedResources = (props: TProps) => {
  return (
    <>
      {props.featuredResources.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-[#F5F5F5] mb-4">
            منابع ویژه
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {props.featuredResources.map((resource) => (
              <Link
                key={resource.id}
                href={`/resources/${resource.id}`}
                className="bg-[#171717] rounded-xl p-5 border border-white/5 hover:border-white/10 transition group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-20 rounded-lg bg-[#0A0A0A] flex items-center justify-center text-2xl border border-white/5 shrink-0">
                    {resource.posterUrl ? (
                      <Image
                        src={resource.posterUrl}
                        alt={resource.name}
                        width={64}
                        height={80}
                        className="rounded-lg object-cover"
                      />
                    ) : (
                      <BookOpen size={24} className="text-gray-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[#F5F5F5] font-medium line-clamp-1 group-hover:text-blue-400 transition">
                      {resource.name}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-1">
                      {resource.author}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${props.typeColors[resource.type]}`}
                      >
                        {props.typeLabels[resource.type]}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Download size={12} />
                        {resource.downloadsCount}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
 
export default FeaturedResources;