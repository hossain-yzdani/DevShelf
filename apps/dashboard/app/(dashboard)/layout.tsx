"use client";

import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/navbar/sidebar";
import SidebarProvider from "@/providers/sidebarProvider";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5]">
        <Sidebar />
        <div className="lg:mr-67">
          <Navbar />
          <main className="p-4 md:p-6 max-w-7xl mx-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
