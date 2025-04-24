"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

type NavLink = {
  name: string;
  href: string;
  component?: React.ReactNode;
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
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
      component: (
        <Image
          src="/8thmilelogocolour.png"
          alt="8th-Mile"
          width={48}
          height={48}
          className="object-contain w-10 h-10 sm:w-12 sm:h-12"
        />
      ),
    },
    { name: "Timeline", href: "/timeline" },
    { name: "Passes", href: "/passes" },
    { name: "Credits", href: "/credits" },
  ];

  const logoLink = navLinks.find((l) => l.name === "Logo");
  const otherLinks = navLinks.filter((l) => l.name !== "Logo");

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled?"mt-2 xl:mx-44 md:mx-14 mx-10 ":""
      )}
    >
      <div className={cn(
        "transition-all duration-500",
        isScrolled ? "py-3" : "py-4 sm:py-5"
      )}>
      {/* Glass background */}
      <div
        className={cn(
          "absolute inset-0 bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/5",
          isScrolled ? "bg-white/10 rounded-l-3xl rounded-r-3xl shadow-2xl" : "bg-white/5"
        )}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between relative h-14 sm:h-16 z-10">
        {/* RVCE Logo */}
        <Link href="/" className="flex-shrink-0 z-20">
          <div className="w-32 sm:w-40 lg:w-48 p-2">
            <Image
              src="/RVCE Corner Logo BLACK.png"
              alt="RVCE Logo"
              width={140}
              height={140}
              className="object-contain w-full h-auto dark:invert"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 h-full">
          {navLinks.map((link) => (
            <Button
              key={link.name}
              variant="ghost"
              className={cn(
                "text-white hover:text-white/90 text-base lg:text-lg px-3 py-2 lg:px-4",
                "hover:bg-white/10 transition-colors rounded-full backdrop-blur-sm",
                pathname === link.href && "bg-white/20 font-medium"
              )}
              asChild
            >
              {link.component ? (
                <div>{link.component}</div>
              ) : (
                <Link href={link.href}>{link.name}</Link>
              )}
            </Button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden z-20 flex flex-col gap-1.5 p-3 touch-manipulation"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={cn(
              "block w-6 h-0.5 bg-white/80 transition-transform duration-300",
              isMenuOpen && "rotate-45 translate-y-2"
            )}
          />
          <span
            className={cn(
              "block w-6 h-0.5 bg-white/80 transition-opacity duration-300",
              isMenuOpen && "opacity-0"
            )}
          />
          <span
            className={cn(
              "block w-6 h-0.5 bg-white/80 transition-transform duration-300",
              isMenuOpen && "-rotate-45 -translate-y-2"
            )}
          />
        </button>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 top-14 sm:top-16 mt-5 pt-8 pb-8 px-4 bg-black/80 backdrop-blur-sm z-10 flex justify-center md:hidden">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl shadow-black/20 overflow-y-auto max-h-[calc(100vh-3.5rem)] sm:max-h-[calc(100vh-4rem)]">
              {/* Centered Logo */}
              {logoLink && (
                <div className="flex justify-center mb-6">
                  <Link href={logoLink.href} onClick={() => setIsMenuOpen(false)}>
                    {logoLink.component}
                  </Link>
                </div>
              )}

              {/* Other Links */}
              <ul className="flex flex-col gap-2">
                {otherLinks.map((link) => (
                  <li key={link.name}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start text-white text-lg py-3 px-4 transition-colors",
                        "hover:bg-white/20 rounded-lg",
                        pathname === link.href && "bg-white/20 font-medium"
                      )}
                      onClick={() => setIsMenuOpen(false)}
                      asChild
                    >
                      <Link href={link.href}>{link.name}</Link>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      </div>
    </header>
  );
}