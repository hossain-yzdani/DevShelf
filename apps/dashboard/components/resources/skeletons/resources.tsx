import { Skeleton } from "@/components/ui/skeleton/skeleton";

interface GridModeSkeletonProps {
  count?: number;
}

const GridModeSkeleton = ({ count = 3 }: GridModeSkeletonProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="bg-[#171717] rounded-xl border border-white/5 overflow-hidden flex flex-col"
        >
          <div className="p-5 pb-3 flex-1">
            <div className="w-full aspect-video rounded-lg bg-[#0A0A0A] border border-white/5 mb-3 overflow-hidden">
              <Skeleton className="w-full h-full bg-neutral-800" />
            </div>

            <Skeleton className="h-5 w-3/4 bg-neutral-800" />

            <Skeleton className="h-4 w-1/2 bg-neutral-800 mt-1" />

            <div className="flex items-center justify-between mt-3">
              <Skeleton className="h-5 w-16 rounded-full bg-neutral-800" />
              <Skeleton className="h-4 w-12 bg-neutral-800" />
            </div>
          </div>

          <div className="flex items-center gap-1 p-3 border-t border-white/5 bg-[#0A0A0A]">
            <Skeleton className="h-8 w-8 rounded-lg bg-neutral-800" />
            <Skeleton className="h-8 w-8 rounded-lg bg-neutral-800" />
            <div className="flex-1" />
            <Skeleton className="h-8 w-8 rounded-lg bg-neutral-800" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridModeSkeleton;