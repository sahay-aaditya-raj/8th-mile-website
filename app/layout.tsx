import React from "react"
import localFont from 'next/font/local'

import type { Metadata } from 'next'
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL('https://8thmile.rvce.edu.in'),
  title: {
    default: '8th Mile 2025 - ASHTRANG | RV College of Engineering',
    template: '%s | 8th Mile 2025'
  },
  description: 'Join 8th Mile ASHTRANG 2025, the premier national techno-cultural festival at RV College of Engineering, Bangalore. Experience exciting events, live performances, and showcase your talents on December 4th, 5th & 6th, 2025.',
  keywords: ['8th Mile', 'ASHTRANG', 'RVCE', 'RV College of Engineering', 'college fest', 'cultural fest', 'tech fest', 'Bangalore', 'student festival', 'college events', 'techno-cultural festival', 'December 2025'],
  authors: [{ name: '8th Mile RVCE' }],
  creator: '8th Mile RVCE',
  publisher: 'RV College of Engineering',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://8thmile.rvce.edu.in',
    siteName: '8th Mile 2025',
    title: '8th Mile 2025 - ASHTRANG | RV College of Engineering',
    description: 'Join 8th Mile ASHTRANG 2025, the premier national techno-cultural festival at RV College of Engineering. December 4th, 5th & 6th, 2025.',
    images: [
      {
        url: '/logo.avif',
        width: 1200,
        height: 630,
        alt: '8th Mile 2025 ASHTRANG Festival',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '8th Mile 2025 - ASHTRANG | RV College of Engineering',
    description: 'Join 8th Mile ASHTRANG 2025, the premier national techno-cultural festival at RV College of Engineering. December 4th, 5th & 6th, 2025.',
    images: ['/logo.avif'],
    creator: '@8thmile.rvce',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/logo.avif',
  },
  verification: {
    google: 'TkhymInhbTtd96Mpa7lguV_NQzb5x0BUdRknJ-IDvxo',
  },
  alternates: {
    canonical: 'https://8thmile.rvce.edu.in',
  },
}

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

const delagothic = localFont({
  src: "../public/fonts/DelaGothicOne-Regular.ttf",
  display: 'swap',
  variable: '--font-delagothic',
})

const seasons = localFont({
  src: "../public/fonts/theseasons-reg.ttf",
  display: 'swap',
  variable: '--font-seasons',
})

const sora = localFont({
  src: "../public/fonts/Sora-VariableFont_wght.ttf",
  display: 'swap',
  variable: '--font-sora',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: '8th Mile ASHTRANG 2025',
    description: 'Premier national techno-cultural festival at RV College of Engineering',
    startDate: '2025-12-04T09:00:00+05:30',
    endDate: '2025-12-06T20:00:00+05:30',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: 'RV College of Engineering',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Mysore Road',
        addressLocality: 'Bangalore',
        addressRegion: 'Karnataka',
        postalCode: '560059',
        addressCountry: 'IN'
      }
    },
    image: [
      'https://8thmile.rvce.edu.in/logo.avif'
    ],
    organizer: {
      '@type': 'EducationalOrganization',
      name: 'RV College of Engineering',
      url: 'https://www.rvce.edu.in'
    },
    performer: [
      {
        '@type': 'Person',
        name: 'Various Artists'
      }
    ],
    offers: {
      '@type': 'Offer',
      url: 'https://8thmile.rvce.edu.in/events',
      availability: 'https://schema.org/InStock',
      validFrom: '2025-11-01T00:00:00+05:30'
    }
  }

  return (
    <html lang="en" suppressHydrationWarning className={`${samarkan.variable} ${akaya.variable} ${fraunces.variable} ${poppins.variable} ${delagothic.variable} ${sora.variable} ${seasons.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}