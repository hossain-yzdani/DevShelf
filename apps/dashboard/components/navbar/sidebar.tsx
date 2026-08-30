'use client';

import { usePathname } from "next/navigation";
import {
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { useSidebar } from "@/hooks/useSidebar";
import navItems from "@/data/navItems";
import Image from "next/image";


const Sidebar = () => {
  const pathname = usePathname();

  const { isSideOpen, openSidebar, closeSidebar, toggleSidebar } = useSidebar();

  return (
    <>
      <aside
        className={`fixed top-0 bottom-0 right-0 my-3 mr-3 rounded-xl w-64 bg-[#171717] border-l border-white/5 z-50 transition-transform duration-300 ${
          isSideOpen ? "translate-x-0" : "translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex items-center gap-3 px-6 h-16 border-b border-white/5">
          <div className="w-8 h-8 flex items-center justify-center">
            <Image src={'/logo/logoDevShelf.png'} alt="DevShelf Logo" />
          </div>
          <span className="text-lg font-bold text-[#F5F5F5]">DevShelf</span>
          <span className="text-[10px] text-gray-500 bg-[#0A0A0A] px-2 py-0.5 rounded-full">
            v1
          </span>
        </div>

        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => openSidebar()}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-[#F5F5F5]/10 text-[#F5F5F5]"
                    : "text-gray-400 hover:text-[#F5F5F5] hover:bg-white/5"
                }`}
              >
                <span className="shrink-0">{item.icon}</span>
                <span className="text-sm font-medium">{item.title}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 right-0 left-0 p-4 border-t border-white/5">
          <button
            onClick={() => {
              // TODO: Logout
              window.location.href = "/login";
            }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 w-full"
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">خروج</span>
          </button>
        </div>
      </aside>

      {isSideOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => closeSidebar()}
        />
      )}
    </>
  );
}
 
export default Sidebar;