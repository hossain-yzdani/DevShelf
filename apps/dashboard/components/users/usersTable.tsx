import { Users } from "lucide-react";
import { User } from "../../../../packages/types/user.type";
import UserActions from "../ui/actions/userActions";
import UsersTableSkeleton from "./skeleton/usersTableSkeleton";

const roleColors: Record<User["role"], string> = {
  admin: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  editor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  user: "bg-gray-500/20 text-gray-400 border-gray-500/30",
};

const roleLabels: Record<User["role"], string> = {
  admin: "مدیر",
  editor: "نویسنده",
  user: "کاربر",
};

const statusColors: Record<string, string> = {
  true: "bg-green-500/20 text-green-400 border-green-500/30",
  false: "bg-red-500/20 text-red-400 border-red-500/30",
};

const statusLabels: Record<string, string> = {
  true: "فعال",
  false: "غیرفعال",
};

interface TProps {
  paginatedUsers: User[];
  handleDelete: (user: User) => void;
  handleUpdata: (user: User) => void;
  loading: boolean;
}

const UsersTable = ({
  paginatedUsers,
  handleDelete,
  handleUpdata,
  loading,
}: TProps) => {
  if (loading === true) {
    return <UsersTableSkeleton />;
  }

  return (
    <>
      {paginatedUsers.length === 0 ? (
        <div className="text-center py-12 bg-[#171717] rounded-xl border border-white/5">
          <Users size={48} className="text-gray-600 mx-auto" />
          <p className="text-gray-400 mt-3">هیچ کاربری یافت نشد</p>
        </div>
      ) : (
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
                    علاقه مندی ها
                  </th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                    دانلود ها
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
                {paginatedUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-white/5 transition-colors duration-200"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#0A0A0A] border border-white/5 flex items-center justify-center text-sm font-medium text-[#F5F5F5]">
                          {user.firstName?.charAt(0)}
                        </div>
                        <div>
                          <p className="text-[#F5F5F5] font-medium text-sm">
                            {`${user.firstName} ${user.lastName}`}
                          </p>
                          <p className="text-gray-500 text-xs">
                            @{user.username}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-300 text-sm">
                      {user.username}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full border ${roleColors[user.role]}`}
                      >
                        {roleLabels[user.role]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        // onClick={() => handleToggleStatus(user.id)}
                        className={`text-xs px-2 py-1 rounded-full border transition hover:opacity-80 ${statusColors[`${user.isActive}`]}`}
                      >
                        {statusLabels[`${user.isActive}`]}
                      </button>
                    </td>
                    <td className="px-4 py-3">{user.favoritesCount}</td>
                    <td className="px-4 py-3">{user.downloadsCount}</td>
                    <td className="px-4 py-3 text-gray-400 text-xs">
                      {new Date(user.updatedAt).toLocaleDateString("fa-IR")}
                    </td>
                    <td className="px-4 py-3">
                      <UserActions
                        user={user}
                        handleDelete={handleDelete}
                        handleEdit={handleUpdata}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default UsersTable;
