"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

type NavLink = {
  name: string;
  href: string; // Changed from optional to required
  component?: React.ReactNode;
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setIsMenuOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/events" },
    { name: "Gallery", href: "/gallery" },
    { 
      name: "Logo", 
      href: "/", 
      component: <Image 
        src="/8thmilelogocolour.png" 
        alt="8th-Mile" 
        width={50} 
        height={50} 
        className="object-contain" 
      />
    },
    { name: "Timeline", href: "/timeline" },
    { name: "Passes", href: "/passes" },
    { name: "Credits", href: "/credits" },
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      isScrolled ? "py-2" : "py-4"
    )}>
      {/* Glass background container */}
      <div className={cn(
        "absolute inset-0 bg-white/5 backdrop-blur-xl border-b border-white/10",
        "shadow-lg shadow-black/5",
        isScrolled ? "bg-white/10" : "bg-white/5"
      )}></div>

      <div className="container mx-auto px-4 flex items-center justify-between h-16 relative">
        {/* RVCE Logo */}
        <Link href="/" className="z-10">
          <Image 
            src="/RVCE Corner Logo WHITE.png" 
            alt="RVCE Logo" 
            width={200} 
            height={200} 
            className="object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2 h-full z-10">
          {navLinks.map((link) => (
            <Button
              key={link.name}
              variant="ghost"
              className={cn(
                "text-white hover:text-white/80 text-lg px-4 py-2",
                "hover:bg-white/10 transition-colors",
                "rounded-full backdrop-blur-sm",
                pathname === link.href && "bg-white/20 font-medium"
              )}
              asChild
            >
              {link.component ? (
                <div>{link.component}</div>
              ) : (
                <Link href={link.href} passHref>
                  {link.name}
                </Link>
              )}
            </Button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden z-10 flex flex-col gap-1.5 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          {/* Hamburger icon lines */}
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={cn(
            "fixed inset-0 top-16 bg-black/80 backdrop-blur-sm z-40",
            "flex justify-center pt-8 px-4",
            "md:hidden"
          )}>
            <div className={cn(
              "w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl",
              "p-6 border border-white/10 shadow-2xl shadow-black/20",
              "overflow-y-auto max-h-[80vh]"
            )}>
              <ul className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start text-white text-lg py-4 px-6",
                        "hover:bg-white/20",
                        pathname === link.href && "bg-white/20 font-medium"
                      )}
                      onClick={() => setIsMenuOpen(false)}
                      asChild
                    >
                      {link.component ? (
                        <div className="flex justify-center">{link.component}</div>
                      ) : (
                        <Link href={link.href} passHref>
                          {link.name}
                        </Link>
                      )}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}