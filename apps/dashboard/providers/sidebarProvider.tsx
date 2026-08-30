import SidebarContext from "@/contexts/SidebarContext";
import { ReactNode, useState } from "react";

export default function SidebarProvider({ children }: { children: ReactNode }) {
  const [isSideOpen, setIsSideOpen] = useState(false);

  const toggleSidebar = () => setIsSideOpen((prev) => !prev);
  const closeSidebar = () => setIsSideOpen(false);
  const openSidebar = () => setIsSideOpen(true);

  return (
    <SidebarContext.Provider
      value={{
        isSideOpen,
        toggleSidebar,
        closeSidebar,
        openSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
