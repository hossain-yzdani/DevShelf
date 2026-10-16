// components/settings/settingsSkeleton.tsx
export default function SettingsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <div className="h-9 w-32 bg-white/5 rounded-lg animate-pulse" />
          <div className="h-4 w-56 bg-white/5 rounded-lg animate-pulse mt-2" />
        </div>
        <div className="h-10 w-36 bg-white/5 rounded-xl animate-pulse" />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="h-10 w-24 bg-white/5 rounded-xl animate-pulse"
          />
        ))}
      </div>

      {/* Content */}
      <div className="bg-[#171717] rounded-xl border border-white/5 p-6 space-y-6">
        {/* Title */}
        <div className="h-5 w-32 bg-white/5 rounded animate-pulse" />

        {/* Fields */}
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-24 bg-white/5 rounded animate-pulse" />
              <div className="h-11 w-full bg-white/5 rounded-xl animate-pulse" />
            </div>
          ))}
        </div>

        {/* Toggles */}
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 bg-[#0A0A0A] rounded-xl border border-white/5"
            >
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-white/5 rounded animate-pulse" />
                <div className="space-y-1.5">
                  <div className="h-4 w-32 bg-white/5 rounded animate-pulse" />
                  <div className="h-3 w-48 bg-white/5 rounded animate-pulse" />
                </div>
              </div>
              <div className="w-10 h-6 bg-white/5 rounded-full animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
