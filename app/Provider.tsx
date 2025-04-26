"use client";

import { NavbarProvider } from "@/contexts/NavbarContext"
import { SidebarProvider } from "@/contexts/SidebarContext";
// import Footer from "@/components/Footer"
import { ThemeProvider } from "@/components/theme-provider"
// import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { ParallaxProvider } from 'react-scroll-parallax';
import Footer2 from "@/components/Footer2";
import Navbar2 from "@/components/Navbar2";

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
                            <Navbar2 />
                            <Sidebar />
                            <div>
                                {children}
                            </div>
                        </ParallaxProvider>
                    </SidebarProvider>
                </NavbarProvider>
                {/* <Footer/> */}
            <Footer2/>
        </ThemeProvider>
    )
}