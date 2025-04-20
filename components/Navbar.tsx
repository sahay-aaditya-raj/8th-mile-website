"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useNavbar } from "@/contexts/NavbarContext";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { visibleNavbar } = useNavbar();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setIsMenuOpen(false); // Close on desktop
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/events" },
    { name: "Gallery", href: "/gallery" },
    { name: "Timeline", href: "/timeline" },
    { name: "Passes", href: "/passes" },
    { name: "Credits", href: "/credits" },
  ];

  const handleLinkClick = () => {
    if (isMobile) setIsMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed left-0 right-0 z-50 transition-all duration-300 ease-in-out w-full text-4xl",
        isScrolled ? "top-4" : "top-0",
        visibleNavbar ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between mx-auto px-4 py-2 w-full max-w-[90%] md:max-w-4xl transition-all duration-300",
          isScrolled
            ? "bg-background/70 backdrop-blur-xl shadow-lg rounded-2xl"
            : "bg-transparent"
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.avif" alt="8th-Mile" width={isMobile ? 40 : 50} height={isMobile ? 40 : 50} />
        </Link>

        {/* Mobile View */}
        {isMobile ? (
          <>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex flex-col gap-1 p-2 rounded-md hover:bg-background/20"
            >
              <span className="block w-6 h-0.5 bg-foreground rounded-sm"></span>
              <span className="block w-6 h-0.5 bg-foreground rounded-sm"></span>
              <span className="block w-6 h-0.5 bg-foreground rounded-sm"></span>
            </button>

            {isMenuOpen && (
              <div className="absolute top-full right-4 mt-2 bg-background/95 backdrop-blur-xl rounded-xl shadow-xl p-4 w-72 z-50">
                <ul className="flex flex-col gap-3">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <Button
                        variant={
                          link.href === "/"
                            ? pathname === "/" ? "outline" : "ghost"
                            : pathname?.includes(link.href) ? "outline" : "ghost"
                        }
                        
                        className="w-full justify-start text-lg"
                        asChild
                      >
                        <Link href={link.href} onClick={handleLinkClick}>
                          {link.name}
                        </Link>
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        ) : (
          <nav className="flex items-center gap-2">
            {navLinks.map((link) => (
              <Button
                key={link.name}
                variant={
                  link.href === "/"
                    ? pathname === "/" ? "outline" : "ghost"
                    : pathname?.includes(link.href) ? "outline" : "ghost"
                }
                
                className="p-3 text-xl"
                asChild
              >
                <Link href={link.href}>{link.name}</Link>
              </Button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
