"use client";

import { NavbarProvider } from "@/contexts/NavbarContext"
import { ThemeProvider } from "@/components/theme-provider"
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
                        <ParallaxProvider>
                            {!(isPaymentRoute || isGetpass) && <Navbar />}
                            <div>
                                {children}
                            </div>
                        </ParallaxProvider>
                </NavbarProvider>
                {/* <Footer/> */}
                {!(isPaymentRoute || isGetpass) && <Footer2 />}
        </ThemeProvider>
    )
}
