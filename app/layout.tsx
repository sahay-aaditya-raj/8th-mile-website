import React from "react"
import localFont from 'next/font/local'

import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: '8th Mile 2025',
  description: '8th Mile 2025, official fest of R.V. College of Engineering',
  icons:"/favicon.ico"
}
import "./globals.css"

// fonts
const samarkan = localFont({
  src: '../public/fonts/SAMAN___.ttf',
  display: 'swap',
  variable: '--font-samarkan',
})


const poppins = localFont({
  src: '../public/fonts/Poppins-Regular.ttf',
  display: 'swap',
  variable: '--font-poppins',
})

const akaya = localFont({
  src: "../public/fonts/AkayaKanadaka-Regular.ttf",
  display: 'swap',
  variable:'--font-akaya',
})

const fraunces = localFont({
  src: "../public/fonts/Fraunces-VariableFont_SOFT,WONK,opsz,wght.ttf",
  display: 'swap',
  variable: '--font-fraunces',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning className={`${samarkan.variable} ${akaya.variable} ${fraunces.variable} ${poppins.variable}`}>
        <head />
        <body>
          {children}
        </body>
      </html>
    </>
  )
}