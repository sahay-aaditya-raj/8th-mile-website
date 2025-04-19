"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface SidebarContextType {
  visibleSidebar: boolean;
  setVisibleSidebar: (visible: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [visibleSidebar, setVisibleSidebar] = useState(true);

  return (
    <SidebarContext.Provider value={{ visibleSidebar, setVisibleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
