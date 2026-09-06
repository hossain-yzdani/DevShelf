import { Skeleton } from "@/components/ui/skeleton/skeleton";

const FeaturedResourcesSkeleton = () => {
  return (
    <div>
      <div className="text-lg font-semibold text-[#F5F5F5] mb-4">
        <Skeleton className="h-6 w-32 bg-neutral-700" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(2)].map((_, index) => (
          <div
            key={index}
            className="bg-[#171717] rounded-xl p-5 border border-white/5"
          >
            <div className="flex items-start gap-4">
              <Skeleton className="w-16 h-20 rounded-lg bg-neutral-700 shrink-0" />
              <div className="flex-1 min-w-0 space-y-2">
                <Skeleton className="h-5 w-3/4 bg-neutral-700" />
                <Skeleton className="h-4 w-1/2 bg-neutral-700" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-16 rounded-full bg-neutral-700" />
                  <Skeleton className="h-4 w-12 bg-neutral-700" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedResourcesSkeleton;
