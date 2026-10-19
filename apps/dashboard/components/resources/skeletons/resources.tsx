import { Skeleton } from "@/components/ui/skeleton/skeleton";

const SettingsSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* ─── Content Card ─── */}
      <div className="bg-[#171717] rounded-xl border border-white/5 p-6 space-y-6">
        {/* Title */}
        <Skeleton className="h-5 w-40 bg-neutral-800" />

        {/* Fields */}
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-4 w-28 bg-neutral-800" />
              <Skeleton className="h-11 w-full rounded-xl bg-neutral-800" />
            </div>
          ))}
        </div>

        {/* Toggles */}
        <div className="space-y-3">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-[#0A0A0A] rounded-xl border border-white/5"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="w-5 h-5 rounded bg-neutral-800" />
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-32 bg-neutral-800" />
                  <Skeleton className="h-3 w-48 bg-neutral-800" />
                </div>
              </div>
              <Skeleton className="w-10 h-6 rounded-full bg-neutral-800" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsSkeleton;
