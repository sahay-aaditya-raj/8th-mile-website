import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/checkout/', '/event-checkout/', '/payment-status/'],
      },
    ],
    sitemap: 'https://8thmile.rvce.edu.in/sitemap.xml',
  }
}
