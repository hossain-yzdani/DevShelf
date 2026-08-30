"use client";

import { createContext } from "react";

interface SidebarContextType {
  isSideOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  openSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export default SidebarContext;