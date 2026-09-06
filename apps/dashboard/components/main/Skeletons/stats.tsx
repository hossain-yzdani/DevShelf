import { Skeleton } from "@/components/ui/skeleton/skeleton";

const StatsSkeleton = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="bg-[#171717] rounded-xl p-4 border border-white/5"
        >
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Skeleton className="w-4 h-4 rounded bg-neutral-700" />
            <Skeleton className="h-4 w-16 bg-neutral-700" />
          </div>
          <Skeleton className="h-8 w-12 bg-neutral-700 mt-1" />
        </div>
      ))}
    </div>
  );
};

export default StatsSkeleton;