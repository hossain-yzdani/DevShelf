import { Skeleton } from "@/components/ui/skeleton/skeleton";

const AnalyticsPageSkeleton = () => {
  return (
    <div className="space-y-6">

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="bg-[#171717] rounded-xl p-4 border border-white/5"
          >
            <div className="flex items-center gap-2">
              <Skeleton className="w-4 h-4 rounded bg-neutral-800" />
              <Skeleton className="h-4 w-16 bg-neutral-800" />
            </div>
            <Skeleton className="h-8 w-12 bg-neutral-800 mt-1" />
            <Skeleton className="h-3 w-20 bg-neutral-800 mt-2" />
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="bg-[#171717] rounded-xl border border-white/5 p-5"
          >
            <Skeleton className="h-5 w-40 bg-neutral-800 mb-4" />
            <div className="space-y-3">
              <div className="flex items-end gap-1 h-40">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 flex flex-col items-center gap-1"
                  >
                    <Skeleton
                      className="w-full rounded-t"
                      style={{
                        height: `${20 + Math.random() * 60}px`,
                        minHeight: "10px",
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2">
                {[...Array(7)].map((_, i) => (
                  <Skeleton key={i} className="h-3 w-8 bg-neutral-800" />
                ))}
              </div>
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="w-4 h-0.5 bg-neutral-800" />
                  <Skeleton className="h-3 w-12 bg-neutral-800" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="w-4 h-0.5 bg-neutral-800" />
                  <Skeleton className="h-3 w-12 bg-neutral-800" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Popular Resources Table */}
      <div className="bg-[#171717] rounded-xl border border-white/5 overflow-hidden">
        <div className="p-4 border-b border-white/5">
          <Skeleton className="h-5 w-32 bg-neutral-800" />
        </div>
        <div className="overflow-x-auto p-4">
          <div className="space-y-3">
            <div className="flex gap-4 pb-2 border-b border-white/5">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-4 flex-1 bg-neutral-800" />
              ))}
            </div>
            {[...Array(5)].map((_, rowIndex) => (
              <div key={rowIndex} className="flex gap-4 items-center">
                {[...Array(4)].map((_, colIndex) => (
                  <Skeleton
                    key={colIndex}
                    className="h-6 flex-1 bg-neutral-800"
                    style={{
                      width: colIndex === 0 ? "120px" : "auto",
                      maxWidth: colIndex === 0 ? "120px" : "none",
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities Table */}
      <div className="bg-[#171717] rounded-xl border border-white/5 overflow-hidden">
        <div className="p-4 border-b border-white/5">
          <Skeleton className="h-5 w-32 bg-neutral-800" />
        </div>
        <div className="overflow-x-auto p-4">
          <div className="space-y-3">
            <div className="flex gap-4 pb-2 border-b border-white/5">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-4 flex-1 bg-neutral-800" />
              ))}
            </div>
            {[...Array(5)].map((_, rowIndex) => (
              <div key={rowIndex} className="flex gap-4 items-center">
                {[...Array(4)].map((_, colIndex) => (
                  <Skeleton
                    key={colIndex}
                    className="h-6 flex-1 bg-neutral-800"
                    style={{
                      width: colIndex === 0 ? "120px" : "auto",
                      maxWidth: colIndex === 0 ? "120px" : "none",
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPageSkeleton;
