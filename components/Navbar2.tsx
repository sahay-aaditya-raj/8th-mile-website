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
        { name: "Timeline", href: "/timeline" },
        { name: "Passes", href: "/passes" },
        { name: "Credits", href: "/credits" },
    ];

    return (
        <>
            {/* Desktop Navigation */}
            <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-[#fff8e7]/80 backdrop-blur-md p-3 px-8 rounded-2xl border border-[#ecd8b1] shadow-sm shadow-[#f0e2c4] transition-all duration-500 ease-in-out w-[90%] max-w-6xl mx-auto hidden md:block">
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
                            src="/RVCELogoBLACK.png"
                            alt="RVCE Logo"
                            width={50}
                            height={50}
                            className="object-contain h-auto"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation Links */}
                    <nav className="flex items-center gap-2">
                        {navLinks.map((link) =>
                            link.component ? (
                                <div key={link.name}>{link.component}</div>
                            ) : (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={cn(
                                        "poppins font-semibold text-[#442C0D] hover:bg-[#ebe4d5] text-base lg:text-lg transition-colors rounded-xl px-2 py-2",
                                        pathname === link.href && "bg-[#ebe4d5]"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            )
                        )}
                    </nav>
                </div>
            </header>

            {/* Mobile Island Dock Navigation */}
            <div className="md:hidden fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[85%] max-w-sm">
                {/* Main dock button */}
                <div className="relative">
                    {/* Island dock */}
                    <div className="bg-[#fff8e7] rounded-2xl border border-[#ecd8b1] shadow-lg p-3 flex justify-between items-center">
                        {/* Logo on left side */}
                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src="/8thmilelogocolour.png"
                                alt="8th-Mile"
                                width={40}
                                height={40}
                                className="object-contain"
                            />
                        </Link>

                        {/* Centered navbar title */}
                        <span className="poppins font-semibold text-[#442C0D]">8th Mile</span>
                        
                        {/* Menu button on right */}
                        <button
                            className="flex flex-col gap-1 p-2 cursor-pointer"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                            aria-expanded={isMenuOpen}
                        >
                            <span
                                className={cn(
                                    "block w-5 h-0.5 bg-[#442C0D] transition-transform duration-300",
                                    isMenuOpen && "rotate-45 translate-y-1.5 bg-[#1a4734]"
                                )}
                            />
                            <span
                                className={cn(
                                    "block w-5 h-0.5 bg-[#442C0D] transition-opacity duration-300",
                                    isMenuOpen && "opacity-0"
                                )}
                            />
                            <span
                                className={cn(
                                    "block w-5 h-0.5 bg-[#442C0D] transition-transform duration-300",
                                    isMenuOpen && "-rotate-45 -translate-y-1.5 bg-[#1a4734]"
                                )}
                            />
                        </button>
                    </div>

                    {/* Expandable menu */}
                    <div
                        className={cn(
                            "absolute top-16 left-0 right-0 bg-[#fff8e7] rounded-2xl border border-[#ecd8b1] shadow-lg p-4 transition-all duration-300",
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
                                        "poppins font-medium text-[#442C0D] hover:text-[#1a4734] py-2 px-3 rounded-lg transition-colors",
                                        pathname === link.href 
                                            ? "bg-[#1a4734]/10 text-[#1a4734] font-semibold" 
                                            : "hover:bg-[#ecd8b1]/30"
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