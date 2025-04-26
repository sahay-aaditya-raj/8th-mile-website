"use client";

import { NavbarProvider } from "@/contexts/NavbarContext"
import { SidebarProvider } from "@/contexts/SidebarContext";
import Footer from "@/components/Footer"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { ParallaxProvider } from 'react-scroll-parallax';
import { usePathname } from 'next/navigation'; // For client components only

export default function Providers({children}: {children: React.ReactNode}) {
    const pathname = usePathname();
    const isPaymentRoute = pathname.startsWith('/payment');
    return(
        <ThemeProvider
            themes={["light", "dark"]}
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
                <NavbarProvider>
                    <SidebarProvider>
                        <ParallaxProvider>
                            {!isPaymentRoute && <Navbar />}
                            {!isPaymentRoute && <Sidebar />}
                            <div>
                                {children}
                            </div>
                        </ParallaxProvider>
                    </SidebarProvider>
                </NavbarProvider>
            <Footer/>
        </ThemeProvider>
    )
}