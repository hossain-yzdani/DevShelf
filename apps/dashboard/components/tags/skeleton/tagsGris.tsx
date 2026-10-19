import { Skeleton } from "@/components/ui/skeleton/skeleton";

interface TagsGridSkeletonProps {
  count?: number;
}

const TagsGridSkeleton = ({ count = 16 }: TagsGridSkeletonProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="bg-[#171717] rounded-xl border border-white/5 overflow-hidden"
        >
          <div className="flex items-start justify-between p-5">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#0A0A0A] border border-white/5 shrink-0 flex items-center justify-center">
                <Skeleton className="w-4 h-4 rounded bg-neutral-800" />
              </div>
              
              <div className="flex-1 min-w-0 space-y-1.5">
                <Skeleton className="h-5 w-3/4 bg-neutral-800" />
                <Skeleton className="h-3 w-1/2 bg-neutral-800" />
              </div>
            </div>
            
            <Skeleton className="h-6 w-16 rounded-full bg-neutral-800 shrink-0 ml-3" />
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

export default TagsGridSkeleton;