"use client";

import navItems from "@/data/navItems";
import { useSidebar } from "@/hooks/useSidebar";
import { Menu, Search, Bell, User, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { isSideOpen, openSidebar, closeSidebar, toggleSidebar } = useSidebar();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 bg-[#0A0A0A]/80 backdrop-blur-lg border-b border-white/5">
      <div className="flex items-center justify-between px-4 md:px-6 h-16">
        <div className="flex items-center gap-3">
          <button
            onClick={() => openSidebar()}
            className="lg:hidden p-2 rounded-xl hover:bg-white/5 transition"
          >
            <Menu size={20} />
          </button>
          <h2 className="text-sm font-medium text-gray-400 hidden sm:block">
            {navItems.find((i) => i.href === pathname)?.title || "داشبورد"}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 rounded-xl hover:bg-white/5 transition text-gray-400 hover:text-[#F5F5F5]">
            <Search size={18} />
          </button>

          <button className="p-2 rounded-xl hover:bg-white/5 transition text-gray-400 hover:text-[#F5F5F5] relative">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
          </button>

          <div className="flex items-center gap-2 pr-2 border-r border-white/5">
            <div className="w-8 h-8 rounded-full bg-[#F5F5F5]/10 flex items-center justify-center">
              <User size={16} className="text-[#F5F5F5]" />
            </div>
            <span className="text-sm text-[#F5F5F5] hidden sm:block">
              ادمین
            </span>
            <ChevronDown size={14} className="text-gray-400 hidden sm:block" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
