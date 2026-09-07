import { DashboardData } from "../../../../../packages/types/analytics";
import { BookMarked, BookOpen, TrendingUp, Users } from "lucide-react";

interface TProps {
  data: DashboardData;
}

const Stats = ({data}: TProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-[#171717] rounded-xl p-4 border border-white/5">
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <BookOpen size={16} />
          <span>کل منابع</span>
        </div>
        <p className="text-2xl font-bold text-[#F5F5F5] mt-1">
          {data.stats.totalResources}
        </p>
      </div>
      <div className="bg-[#171717] rounded-xl p-4 border border-white/5">
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <TrendingUp size={16} />
          <span>دانلودها</span>
        </div>
        <p className="text-2xl font-bold text-[#F5F5F5] mt-1">
          {data.stats.totalDownloads}
        </p>
      </div>
      <div className="bg-[#171717] rounded-xl p-4 border border-white/5">
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <Users size={16} />
          <span>کاربران فعال</span>
        </div>
        <p className="text-2xl font-bold text-[#F5F5F5] mt-1">
          {data.stats.totalUsers}
        </p>
      </div>
      <div className="bg-[#171717] rounded-xl p-4 border border-white/5">
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <BookMarked size={16} />
          <span>علاقه‌مندی‌ها</span>
        </div>
        <p className="text-2xl font-bold text-[#F5F5F5] mt-1">
          {data.stats.totalFavorites}
        </p>
      </div>
    </div>
  );
}
 
export default Stats;