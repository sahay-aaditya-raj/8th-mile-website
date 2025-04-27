"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLink = {
    name: string;
    href: string;
    component?: React.ReactNode;
};

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const navLinks: NavLink[] = [
        { name: "Home", href: "/" },
        { name: "Events", href: "/events" },
        { name: "Gallery", href: "/gallery" },
        { name: "Timeline", href: "/timeline" },
        { name: "Passes", href: "/passes" },
        { name: "Credits", href: "/credits" },
    ];

    const otherLinks = navLinks.filter((l) => l.name !== "Logo");

    return (
        <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-[#fff8e7]/80 backdrop-blur-md p-3 px-8 rounded-2xl border border-[#ecd8b1] shadow-sm shadow-[#f0e2c4] transition-all duration-500 ease-in-out w-[90%] max-w-6xl mx-auto">
            <div className="flex items-center justify-between w-full">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-4">
                    <Image
                        src="/8thmilelogocolour.png"
                        alt="8th-Mile"
                        width={50}
                        height={50}
                        className="object-contain"
                    />
                    <Image
                        src="/RVCE Corner Logo BLACK.png"
                        alt="RVCE Logo"
                        width={100}
                        height={50}
                        className="object-contain h-auto"
                        priority
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) =>
                        link.component ? (
                            <div key={link.name}>{link.component}</div>
                        ) : (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "poppins font-semibold text-[#442C0D] hover:text-[#1a4734] text-base lg:text-lg transition-colors",
                                    pathname === link.href && "text-[#1a4734]"
                                )}
                            >
                                {link.name}
                            </Link>
                        )
                    )}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden flex flex-col gap-1.5 p-3 z-20 cursor-pointer"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span
                        className={cn(
                            "block w-6 h-0.5 bg-[#442C0D] transition-transform",
                            isMenuOpen && "rotate-45 translate-y-2 bg-[#442C0D]"
                        )}
                    />
                    <span
                        className={cn(
                            "block w-6 h-0.5 bg-[#442C0D] transition-opacity",
                            isMenuOpen && "opacity-0"
                        )}
                    />
                    <span
                        className={cn(
                            "block w-6 h-0.5 bg-[#442C0D] transition-transform",
                            isMenuOpen && "-rotate-45 -translate-y-2 bg-[#442C0D]"
                        )}
                    />
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 top-20 bg-[#fff8e7]/95 flex flex-col items-center pt-10 z-10 backdrop-blur-md">
                    <ul className="flex flex-col gap-8 text-center">
                        {otherLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className={cn(
                                        "font-semibold text-[#442C0D] hover:text-[#E90C00] text-lg transition-colors",
                                        pathname === link.href && "text-[#E90C00]"
                                    )}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
}
