import { Download, Heart, TrendingUp } from "lucide-react";

interface TProps {
  recentActivities: any;
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

const RecentActivities = ({ recentActivities }: TProps) => {
  return (
    <div className="bg-[#171717] rounded-xl border border-white/5 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[#F5F5F5] font-medium">فعالیت‌های اخیر</h3>
        <button className="text-gray-400 hover:text-[#F5F5F5] text-sm transition">
          مشاهده همه
        </button>
      </div>
      <div className="space-y-3">
        {recentActivities.map((activity: any) => (
          <div
            key={activity.id}
            className="flex items-center justify-between p-3 rounded-xl bg-[#0A0A0A] border border-white/5 hover:border-white/10 transition"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activityColors[activity.type as keyof typeof activityColors]
                }`}
              >
                {activity.type === "download" && <Download size={14} />}
                {activity.type === "favorite" && <Heart size={14} />}
                {activity.type === "search" && <TrendingUp size={14} />}
              </div>
              <div>
                <p className="text-[#F5F5F5] text-sm">
                  <span className="font-medium">{activity.user}</span>
                  <span className="text-gray-400 mx-1">
                    {activity.type === "download" && "دانلود کرد"}
                    {activity.type === "favorite" && "ذخیره کرد"}
                    {activity.type === "search" && "جستجو کرد"}
                  </span>
                  <span className="text-gray-400">{activity.resource}</span>
                </p>
                <p className="text-gray-500 text-xs">{activity.time}</p>
              </div>
            </div>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                activityColors[activity.type as keyof typeof activityColors]
              }`}
            >
              {activityLabels[activity.type as keyof typeof activityLabels]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
 
export default RecentActivities;