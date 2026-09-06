"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import Pagination from "@/components/ui/pagination/pagination";
import SearchBox from "@/components/ui/searchBox/searchBox";
import Header from "@/components/main/Header/Header";
import { User } from "../../../../../packages/types/user.type";
import UsersTable from "../../../components/users/usersTable";
import { UsersApi } from "@/utils/users/users.api";
import CreateUserModal from "@/components/users/modals/createUser.modal";
import UpdateUserModal from "@/components/users/modals/updateUser.modal";
import DeleteConfirmModal from "@/components/resources/modals/deleteResource.modal";

export default function UsersPage() {
  const [users, setUsers] = useState<User[] | []>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [createModalOpen, setCreateModalOpen] = useState(false);

  const [savedUser, setSavedUser] = useState<User | null>(null);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

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

  const fetchData = async () => {
    const users = await UsersApi.getAll();
    setUsers(users);
  };

  const handleDelete = (user: User) => {
    setSavedUser(user);
    setDeleteModalOpen(true);
  };

  const handleUpdata = (user: User) => {
    setSavedUser(user);
    setUpdateModalOpen(true);
  };

  const deleteUser = async () => {
    try {
      if (!savedUser || !savedUser.id) {
        throw new Error('Saved User is not valid');
      }
      const response = await UsersApi.delete(savedUser?.id);
      setDeleteModalOpen(false);
      fetchData();
    } catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <Header
        title="کاربران"
        description="مدیریت کاربران سیستم"
        button="کاربر جدید"
        setOpen={() => setCreateModalOpen(true)}
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
        <UsersTable
          paginatedUsers={paginatedUsers}
          handleDelete={handleDelete}
          handleUpdata={handleUpdata}
        />
      )}

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <CreateUserModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onUpdated={fetchData}
      />

      <UpdateUserModal
        user={savedUser}
        isOpen={updateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        onUpdated={fetchData}
      />

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={deleteUser}
      />

    </div>
  );
}
