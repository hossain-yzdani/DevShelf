"use client";

import { useState } from "react";
import {
  Users,
} from "lucide-react";
import Pagination from "@/components/ui/pagination/pagination";
import SearchBox from "@/components/ui/searchBox/searchBox";
import Header from "@/components/main/Header/Header";
import { User } from "../../../../../packages/types/user.type";
import UsersTable from "../../../components/users/usersTable";
import mockUsers from "@/data/mockUsers";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredUsers = users.filter(
    (u) =>
      u.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.firstName?.includes(searchQuery),
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleDelete = (id: string) => {
    if (confirm("آیا از حذف این کاربر مطمئن هستید؟")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <Header
        title="کاربران"
        description="مدیریت کاربران سیستم"
        button="کاربر جدید"
      />

      <SearchBox
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder="کاربران"
      />

      {paginatedUsers.length === 0 ? (
        <div className="text-center py-12 bg-[#171717] rounded-xl border border-white/5">
          <Users size={48} className="text-gray-600 mx-auto" />
          <p className="text-gray-400 mt-3">هیچ کاربری یافت نشد</p>
        </div>
      ) : (
        <UsersTable paginatedUsers={paginatedUsers} handleDelete={handleDelete} />
      )}

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

    </div>
  );
}
