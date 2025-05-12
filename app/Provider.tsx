"use client";

import { NavbarProvider } from "@/contexts/NavbarContext"
import { SidebarProvider } from "@/contexts/SidebarContext";
import Footer from "@/components/Footer"
import { ThemeProvider } from "@/components/theme-provider"
import Sidebar from '@/components/Sidebar';
import { ParallaxProvider } from 'react-scroll-parallax';
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar2";
import Footer2 from "@/components/Footer2";

export default function Providers({children}: {children: React.ReactNode}) {
    const pathname = usePathname();
    const isPaymentRoute = pathname.startsWith('/payment');
    const isGetpass = pathname.startsWith('/getpass');
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
                            {!(isPaymentRoute || isGetpass) && <Navbar />}
                            {!(isPaymentRoute || isGetpass) && <Sidebar />}
                            <div>
                                {children}
                            </div>
                        </ParallaxProvider>
                    </SidebarProvider>
                </NavbarProvider>
                {/* <Footer/> */}
                {!(isPaymentRoute || isGetpass) && <Footer2 />}
        </ThemeProvider>
    )
}