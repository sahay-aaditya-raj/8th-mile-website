import { ThemeProvider } from "@/components/theme-provider"
import React from "react"
import localFont from 'next/font/local'

import "./globals.css"

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
          <ThemeProvider
            themes={["light", "dark"]}
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}