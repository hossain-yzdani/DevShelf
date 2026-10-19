import { Skeleton } from "@/components/ui/skeleton/skeleton";

interface GridModeSkeletonProps {
  count?: number;
}

const GridModeSkeleton = ({ count = 10 }: GridModeSkeletonProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="bg-[#171717] rounded-xl border border-white/5 overflow-hidden flex flex-col"
        >
          <div className="block flex-1">
            {/* تصویر */}
            <div className="relative w-full aspect-2/3 bg-[#0A0A0A] rounded-t-xl overflow-hidden">
              <Skeleton className="w-full h-full bg-neutral-800" />

              {/* بج نوع */}
              <Skeleton className="absolute top-2 right-2 h-5 w-12 rounded-full bg-neutral-800" />
            </div>

            {/* محتوا */}
            <div className="p-3 space-y-2">
              <Skeleton className="h-4 w-full bg-neutral-800" />
              <Skeleton className="h-4 w-3/4 bg-neutral-800" />
              <Skeleton className="h-3 w-1/2 bg-neutral-800" />

              <div className="flex items-center justify-between pt-2">
                <Skeleton className="h-3 w-10 bg-neutral-800" />
                <Skeleton className="h-3 w-10 bg-neutral-800" />
              </div>
            </div>
          </div>

          {/* اکشن‌ها */}
          <div className="flex items-center justify-between p-2 border-t border-white/5 bg-[#0A0A0A]">
            <Skeleton className="h-7 w-7 rounded-lg bg-neutral-800" />
            <Skeleton className="h-7 w-7 rounded-lg bg-neutral-800" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridModeSkeleton;
