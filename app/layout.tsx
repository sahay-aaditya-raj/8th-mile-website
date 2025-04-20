import { ThemeProvider } from "@/components/theme-provider"
import React from "react"
import localFont from 'next/font/local'
import { NavbarProvider } from "@/contexts/NavbarContext"
import { SidebarProvider } from "@/contexts/SidebarContext";
import Footer from "@/components/Footer" // Adjust import path if needed
import "./globals.css"
import { Providers } from './providers';

// fonts
const samarkan = localFont({
  src: '../public/fonts/SAMAN___.ttf',
  display: 'swap',
  variable: '--font-samarkan',
})

const akaya = localFont({
  src: "../public/fonts/AkayaKanadaka-Regular.ttf",
  display: 'swap',
  variable: '--font-akaya',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning className={`${samarkan.variable} ${akaya.variable}`}>
        <head />
        <body>
        <Providers>
          <ThemeProvider
            themes={["light", "dark"]}
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            <NavbarProvider>
              <SidebarProvider>
                {children}
              </SidebarProvider>
            </NavbarProvider>
            <Footer/>
          </ThemeProvider>
          </Providers>
        </body>
      </html>
    </>
  )
}