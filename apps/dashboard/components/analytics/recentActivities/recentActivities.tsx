import { Download, Heart, TrendingUp } from "lucide-react";
import { RecentActivity } from "../../../../../packages/types/analytics";
import Link from "next/link";

interface RecentActivitiesProps {
  recentActivities: RecentActivity[];
  title?: string;
  showViewAll?: boolean;
  onViewAll?: () => void;
}

const activityColors = {
  download: "text-green-400 bg-green-500/10",
  favorite: "text-pink-400 bg-pink-500/10",
  search: "text-blue-400 bg-blue-500/10",
};

const activityLabels = {
  download: "دانلود",
  favorite: "علاقه‌مندی",
  search: "جستجو",
};

const activityIcons = {
  download: Download,
  favorite: Heart,
  search: TrendingUp,
};

const activityVerbs = {
  download: "دانلود کرد",
  favorite: "ذخیره کرد",
  search: "جستجو کرد",
};

const RecentActivities = ({
  recentActivities = [],
  title = "فعالیت‌های اخیر",
  showViewAll = true,
  onViewAll,
}: RecentActivitiesProps) => {
  if (recentActivities.length === 0) {
    return (
      <div className="bg-[#171717] rounded-xl border border-white/5 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#F5F5F5] font-medium">{title}</h3>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-400">هیچ فعالیتی یافت نشد</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#171717] rounded-xl border border-white/5 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[#F5F5F5] font-medium">{title}</h3>
        {showViewAll && (
          <button
            onClick={onViewAll}
            className="text-gray-400 hover:text-[#F5F5F5] text-sm transition"
          >
            مشاهده همه
          </button>
        )}
      </div>
      <div className="space-y-3">
        {recentActivities.map((activity) => {
          const Icon = activityIcons[activity.type] || Download;
          const color = activityColors[activity.type] || activityColors.download;
          const label = activityLabels[activity.type] || activityLabels.download;
          const verb = activityVerbs[activity.type] || activityVerbs.download;

          return (
            <div
              key={activity.id}
              className="flex items-center justify-between p-3 rounded-xl bg-[#0A0A0A] border border-white/5 hover:border-white/10 transition"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${color}`}
                >
                  <Icon size={14} />
                </div>
                <div>
                  <p className="text-[#F5F5F5] text-sm">
                    <span className="font-medium">{activity.user}</span>
                    <span className="text-gray-400 mx-1">{verb}</span>
                    <span className="text-gray-400">{activity.resource}</span>
                  </p>
                  <p className="text-gray-500 text-xs">{activity.time}</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${color}`}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivities;