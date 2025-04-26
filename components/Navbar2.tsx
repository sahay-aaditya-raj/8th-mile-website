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

    const logoLink = navLinks.find((l) => l.name === "Logo");
    const otherLinks = navLinks.filter((l) => l.name !== "Logo");

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black p-2 border-b border-[#ec0900] shadow-md shadow-[#1a4734] transition-all duration-500 ease-in-out">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                {/* RVCE Logo */}
                <Link href="/" className="flex-shrink-0">
                    <div className="flex flex-row p-2">
                        <Image
                            src="/8thmilelogocolour.png"
                            alt="8th-Mile"
                            width={60}
                            height={60}
                            className="object-contain"
                        />
                        <Image
                            src="/RVCE Corner Logo WHITE.png"
                            alt="RVCE Logo"
                            width={120}
                            height={60}
                            className="object-contain w-full h-auto"
                            priority
                        />
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-4">
                    {navLinks.map((link) =>
                        link.component ? (
                            <div key={link.name}>{link.component}</div> // Render component directly
                        ) : (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "fraunces text-f9dd9c hover:text-e90c00 text-base lg:text-lg px-3 py-2 transition-colors",
                                    pathname === link.href && "text-e90c00 font-semibold"
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
                            "block w-6 h-0.5 bg-white transition-transform",
                            isMenuOpen && "rotate-45 translate-y-2 bg-white"
                        )}
                    />
                    <span
                        className={cn(
                            "block w-6 h-0.5 bg-white transition-opacity",
                            isMenuOpen && "opacity-0"
                        )}
                    />
                    <span
                        className={cn(
                            "block w-6 h-0.5 bg-white transition-transform",
                            isMenuOpen && "-rotate-45 -translate-y-2 bg-white"
                        )}
                    />
                </button>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <div className="fixed inset-0 top-24 bg-black flex flex-col items-center justify-start pt-8 z-10">
                        {/* Centered Logo */}
                        {logoLink && (
                            <div className="mb-6">
                                <Link href={logoLink.href} onClick={() => setIsMenuOpen(false)}>
                                    {logoLink.component}
                                </Link>
                            </div>
                        )}

                        {/* Other Links */}
                        <ul className="flex flex-col gap-4">
                            {otherLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={cn(
                                            "fraunces text-f9dd9c hover:text-e90c00 text-base lg:text-lg px-3 py-2 transition-colors",
                                            pathname === link.href && "text-e90c00 font-semibold"
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
            </div>
        </header>
    );
}
