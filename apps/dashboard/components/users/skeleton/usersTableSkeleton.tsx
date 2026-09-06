import { Skeleton } from "@/components/ui/skeleton/skeleton";

interface UsersTableSkeletonProps {
  count?: number;
}

const UsersTableSkeleton = ({ count = 5 }: UsersTableSkeletonProps) => {
  return (
    <div className="bg-[#171717] rounded-xl border border-white/5 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead className="border-b border-white/5">
            <tr>
              <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                کاربر
              </th>
              <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                نام کاربری
              </th>
              <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                نقش
              </th>
              <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                وضعیت
              </th>
              <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                آخرین فعالیت
              </th>
              <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {[...Array(count)].map((_, index) => (
              <tr
                key={index}
                className="hover:bg-white/5 transition-colors duration-200"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-9 h-9 rounded-full bg-neutral-800" />
                    <div>
                      <Skeleton className="h-4 w-24 bg-neutral-800 mb-1" />
                      <Skeleton className="h-3 w-16 bg-neutral-800" />
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3">
                  <Skeleton className="h-4 w-20 bg-neutral-800" />
                </td>

                <td className="px-4 py-3">
                  <Skeleton className="h-6 w-16 rounded-full bg-neutral-800" />
                </td>

                <td className="px-4 py-3">
                  <Skeleton className="h-6 w-16 rounded-full bg-neutral-800" />
                </td>

                <td className="px-4 py-3">
                  <Skeleton className="h-4 w-24 bg-neutral-800" />
                </td>

                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <Skeleton className="h-8 w-8 rounded-lg bg-neutral-800" />
                    <Skeleton className="h-8 w-8 rounded-lg bg-neutral-800" />
                    <Skeleton className="h-8 w-8 rounded-lg bg-neutral-800" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTableSkeleton;
