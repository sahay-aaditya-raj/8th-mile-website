"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
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

    useEffect(() => {
        const handleRouteChange = () => {
            setIsMenuOpen(false);
        };

        // Close menu when navigating
        handleRouteChange();
    }, [pathname]);

    const navLinks: NavLink[] = [
        { name: "Home", href: "/" },
        { name: "Events", href: "/events" },
        { name: "Gallery", href: "/gallery" },
        // { name: "Timeline", href: "/timeline" },
        // { name: "Passes", href: "/passes" },
        // { name: "Our Team", href: "/credits" },
    ];

    return (
        <>
            {/* Desktop Navigation */}
            <div className="absolute p-3 px-8 w-full mx-auto hidden md:block text-white z-50">
                <div className="flex items-center justify-between w-full">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-4">
                        <Image
                            src="/RVCE Corner Logo WHITE.png"
                            alt="RVCE Logo"
                            width={120}
                            height={120}
                            className="object-contain h-auto invert"
                            priority
                        />
                        <span className="w-[1px] h-[42px] bg-black" />
                        <Image
                            src="/8thmilelogocolour.png"
                            alt="8th-Mile"
                            width={60}
                            height={60}
                            className="object-contain"
                        />
                    </Link>

                    {/* Desktop Navigation Links */}
                    <nav className="flex items-center gap-2 text-black">
                        {navLinks.map((link) =>
                            link.component ? (
                                <div key={link.name}>{link.component}</div>
                            ) : (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={cn(
                                        "sora hover:scale-105 transition-all lg:text-lg duration-200 rounded-xl px-2 py-2 text-gray-800",
                                        pathname === link.href && "text-black font-bold"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            )
                        )}
                    </nav>
                </div>
            </div>

            {/* Mobile Island Dock Navigation */}
            <div className="md:hidden fixed left-1/2 transform -translate-x-1/2 z-50 w-[100%]">
                <div className="relative">
                    {/* Island dock */}
                    <div className="bg-transparent p-3 flex justify-between items-center text-white">
                        {/* Logo on left side */}
                        <Link href="/" className="flex items-center gap-4 ">
                            <Image
                                src="/RVCE Corner Logo WHITE.png"
                                alt="RVCE Logo"
                                width={100}
                                height={100}
                                className="object-contain h-auto invert"
                                priority
                            />
                            <span className="w-[1px] h-[42px] bg-black" />
                            <Image
                                src="/8thmilelogocolour.png"
                                alt="8th-Mile"
                                width={50}
                                height={50}
                                className="object-contain"
                            />
                        </Link>

                        {/* Menu button on right */}
                        <button
                            className="flex flex-col gap-1 p-2 cursor-pointer"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                            aria-expanded={isMenuOpen}
                        >
                            <span
                                className={cn(
                                    "block w-5 h-0.5 bg-black transition-transform duration-300",
                                    isMenuOpen && "rotate-45 translate-y-1.5 bg-black"
                                )}
                            />
                            <span
                                className={cn(
                                    "block w-5 h-0.5 bg-black transition-opacity duration-300",
                                    isMenuOpen && "opacity-0"
                                )}
                            />
                            <span
                                className={cn(
                                    "block w-5 h-0.5 bg-black transition-transform duration-300",
                                    isMenuOpen && "-rotate-45 -translate-y-1.5 bg-black"
                                )}
                            />
                        </button>
                    </div>

                    {/* Expandable menu */}
                    <div
                        className={cn(
                            "absolute top-16 left-0 right-0 bg-gray-100 shadow-lg p-4 transition-all duration-300 max-w-sm rounded-xl",
                            isMenuOpen
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8 pointer-events-none"
                        )}
                    >
                        <nav className="flex flex-col gap-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={cn(
                                        "sora font-medium text-gray-800 hover:text-black py-2 px-3 rounded-lg transition-colors",
                                        pathname === link.href
                                            ? "text-black font-semibold"
                                            : "hover:bg-white/10"
                                    )}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>

        </>
    );
}