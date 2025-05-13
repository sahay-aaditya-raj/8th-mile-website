"use client";
import { FaLinkedin, FaInstagram, FaYoutube, FaChevronLeft } from "react-icons/fa";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/contexts/SidebarContext";
import ThemeTogglerButton from "@/components/ThemeTogglerButton";
export default function Sidebar() {
  const { visibleSidebar } = useSidebar();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside
      className={cn(
        "fixed z-[60] right-0 top-30 md:top-50 -translate-y-1/2 md:right-0 md:translate-y-[-50%] md:flex md:flex-col md:items-center bg-sidebar/80 backdrop-blur-xl p-2 rounded-l-lg md:rounded-l-lg transition-transform duration-300 ease-in-out",
        visibleSidebar ? "translate-x-0" : "translate-x-full"
      )}
    >
      {/* Desktop Sidebar (Always visible on desktop) */}
      <div className="hidden md:flex flex-col gap-4 items-center">
        {/* <ThemeTogglerButton /> */}
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={24} className="hover:scale-110 transition-transform text-foreground" />
        </a>
        <a href="https://www.instagram.com/8thmile.rvce/?hl=en" target="_blank" rel="noopener noreferrer">
          <FaInstagram size={24} className="hover:scale-110 transition-transform text-foreground" />
        </a>
        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
          <FaYoutube size={24} className="hover:scale-110 transition-transform text-foreground" />
        </a>
      </div>

      {/* Mobile Toggle & Content */}
      <div className="md:hidden flex flex-col items-center w-full">
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-background rounded-full p-1 hover:bg-background/80 transition-transform"
        >
          <FaChevronLeft
            className={cn(
              "text-foreground transition-transform duration-300 ease-in-out",
              isOpen ? "rotate-180" : "rotate-0"
            )}
            size={16}
          />
        </button>

        {/* Mobile Icons */}
        <div
          className={cn(
            "flex flex-col gap-3 items-center bg-sidebar rounded-lg transition-all duration-300",
            isOpen ? "opacity-100 max-h-40 mt-2 py-2" : "opacity-0 max-h-0 overflow-hidden"
          )}
        >
          <ThemeTogglerButton />
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={16} className="hover:scale-110 transition-transform text-foreground" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={16} className="hover:scale-110 transition-transform text-foreground" />
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            <FaYoutube size={16} className="hover:scale-110 transition-transform text-foreground" />
          </a>
        </div>
      </div>
    </aside>
  );
}
