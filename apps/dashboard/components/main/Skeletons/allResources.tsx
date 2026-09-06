import { Skeleton } from "@/components/ui/skeleton/skeleton";
import { Grid3x3, List, Search } from "lucide-react";

interface AllResourcesSkeletonProps {
  viewMode: "grid" | "list";
  count?: number;
}

const AllResourcesSkeleton = ({
  viewMode = "grid",
  count = 6,
}: AllResourcesSkeletonProps) => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <Skeleton className="h-6 w-32" />

        <div className="flex items-center gap-3">
          {/* Search Skeleton */}
          <div className="relative">
            <Skeleton className="w-48 sm:w-56 h-10 rounded-xl" />
          </div>

          {/* View toggle Skeleton */}
          <div className="flex bg-[#0A0A0A] rounded-xl border border-white/10 p-1">
            <Skeleton className="w-8 h-8 rounded-lg " />
            <Skeleton className="w-8 h-8 rounded-lg ml-1" />
          </div>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(count)].map((_, index) => (
            <div
              key={index}
              className="bg-[#171717] rounded-xl p-4 border border-white/5"
            >
              <div className="flex items-start gap-3">
                <Skeleton className="w-16 h-20 rounded-lg shrink-0" />
                <div className="flex-1 min-w-0 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {[...Array(count)].map((_, index) => (
            <div
              key={index}
              className="bg-[#171717] rounded-xl p-4 border border-white/5 flex items-start gap-3"
            >
              <Skeleton className="w-16 h-20 rounded-lg bg-gray-700 shrink-0" />
              <div className="flex-1 min-w-0 space-y-2">
                <Skeleton className="h-5 w-3/4 bg-gray-700" />
                <Skeleton className="h-4 w-1/2 bg-gray-700" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-16 rounded-full bg-gray-700" />
                  <Skeleton className="h-4 w-12 bg-gray-700" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllResourcesSkeleton;
