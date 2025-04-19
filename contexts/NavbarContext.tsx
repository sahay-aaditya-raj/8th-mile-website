// contexts/NavbarContext.tsx
"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NavbarContextType {
  visibleNavbar: boolean;
  setVisibleNavbar: (visible: boolean) => void;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export const NavbarProvider = ({ children }: { children: ReactNode }) => {
  const [visibleNavbar, setVisibleNavbar] = useState(true);

  return (
    <NavbarContext.Provider value={{ visibleNavbar, setVisibleNavbar }}>
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbar = (): NavbarContextType => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error('useNavbar must be used within a NavbarProvider');
  }
  return context;
};
