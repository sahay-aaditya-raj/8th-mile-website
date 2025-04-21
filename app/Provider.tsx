"use client";

import { NavbarProvider } from "@/contexts/NavbarContext"
import { SidebarProvider } from "@/contexts/SidebarContext";
import Footer from "@/components/Footer"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { ParallaxProvider } from 'react-scroll-parallax';

export default function Providers({children}: {children: React.ReactNode}) {
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
                            <Navbar />
                            <Sidebar />
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