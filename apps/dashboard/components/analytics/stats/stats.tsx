import { ArrowUp, BookOpen, Download, Heart, Users } from "lucide-react";

interface TProps {
  statsData: any;
}

const StatsAnalytics = ({ statsData }: TProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-[#171717] rounded-xl border border-white/5 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <BookOpen size={16} />
            <span>کل منابع</span>
          </div>
          <span className="text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
            <ArrowUp size={12} />
            {statsData.growth.resources}%
          </span>
        </div>
        <p className="text-2xl font-bold text-[#F5F5F5] mt-2">
          {statsData.totalResources}
        </p>
        <p className="text-gray-500 text-xs mt-1">
          +{statsData.growth.resources} نسبت به ماه قبل
        </p>
      </div>

      <div className="bg-[#171717] rounded-xl border border-white/5 p-5">
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <Users size={16} />
          <span>کاربران</span>
        </div>
        <p className="text-2xl font-bold text-[#F5F5F5] mt-2">
          {statsData.totalUsers}
        </p>
        <p className="text-green-400 text-xs mt-1 flex items-center gap-1">
          <ArrowUp size={12} />+{statsData.growth.users} این ماه
        </p>
      </div>

      <div className="bg-[#171717] rounded-xl border border-white/5 p-5">
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <Download size={16} />
          <span>دانلودها</span>
        </div>
        <p className="text-2xl font-bold text-[#F5F5F5] mt-2">
          {statsData.totalDownloads}
        </p>
        <p className="text-green-400 text-xs mt-1 flex items-center gap-1">
          <ArrowUp size={12} />+{statsData.growth.downloads}% این ماه
        </p>
      </div>

      <div className="bg-[#171717] rounded-xl border border-white/5 p-5">
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <Heart size={16} />
          <span>علاقه‌مندی‌ها</span>
        </div>
        <p className="text-2xl font-bold text-[#F5F5F5] mt-2">
          {statsData.totalFavorites}
        </p>
        <p className="text-gray-500 text-xs mt-1">از ۲۸۴ کاربر</p>
      </div>
    </div>
  );
};

export default StatsAnalytics;
