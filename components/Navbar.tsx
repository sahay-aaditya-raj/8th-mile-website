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
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setIsMenuOpen(false); // Close menu on desktop view
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 z-50 transition-all duration-300 ease-in-out w-full text-4xl",
        isScrolled ? "top-4" : "top-0",
        visibleNavbar ? "translate-y-0 opacity-100" : "translate-y-[-150%] opacity-0",
        "backdrop-filter"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between max-w-5/6 md:max-w-1/2 mx-auto px-4 py-1",
          isScrolled
            ? "bg-background/70 backdrop-blur-xl shadow-lg dark:shadow-lg rounded-2xl"
            : "bg-transparent"
        )}
      >
        <div className={"text-xl font-bold text-foreground"}>
          <Image src="/logo.avif" alt="8th-Mile" width={isMobile?40:50} height={isMobile?40:50}/>
        </div>

        {isMobile ? (
          <>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex flex-col gap-1 p-2 rounded-lg hover:bg-background/20"
            >
              <span className="block w-6 h-0.5 bg-foreground"></span>
              <span className="block w-6 h-0.5 bg-foreground"></span>
              <span className="block w-6 h-0.5 bg-foreground"></span>
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-[60px] bg-background/90 rounded-lg shadow-lg p-4 w-full max-w-md">
                <ul className="flex flex-col gap-2">
                  <li>
                    <Button variant={pathname === "/" ? "outline" : "ghost"} asChild>
                      <Link href="/">Home</Link>
                    </Button>
                  </li>
                  <li>
                    <Button variant={pathname?.includes("events") ? "outline" : "ghost"} asChild>
                      <Link href="/events">Events</Link>
                    </Button>
                  </li>
                  <li>
                    <Button variant={pathname?.includes("gallery") ? "outline" : "ghost"} asChild>
                      <Link href="/gallery">Gallery</Link>
                    </Button>
                  </li>
                  <li>
                    <Button variant={pathname?.includes("timeline") ? "outline" : "ghost"} asChild>
                      <Link href="/timeline">Timeline</Link>
                    </Button>
                  </li>
                  <li>
                    <Button variant={pathname?.includes("passes") ? "outline" : "ghost"} asChild>
                      <Link href="/passes">Passes</Link>
                    </Button>
                  </li>
                  <li>
                    <Button variant={pathname?.includes("credits") ? "outline" : "ghost"} asChild>
                      <Link href="/credits">Credits</Link>
                    </Button>
                  </li>
                </ul>
              </div>
            )}
          </>
        ) : (
          <nav className="flex items-center gap-4">
            <Button variant={pathname === "/" ? "outline" : "ghost"} asChild>
              <Link href="/">Home</Link>
            </Button>
            <Button variant={pathname?.includes("events") ? "outline" : "ghost"} asChild>
              <Link href="/events">Events</Link>
            </Button>
            <Button variant={pathname?.includes("gallery") ? "outline" : "ghost"} asChild>
              <Link href="/gallery">Gallery</Link>
            </Button>
            <Button variant={pathname?.includes("timeline") ? "outline" : "ghost"} asChild>
              <Link href="/timeline">Timeline</Link>
            </Button>
            <Button variant={pathname?.includes("passes") ? "outline" : "ghost"} asChild>
              <Link href="/passes">Passes</Link>
            </Button>
            <Button variant={pathname?.includes("credits") ? "outline" : "ghost"} asChild>
              <Link href="/credits">Credits</Link>
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}