import type { NextConfig } from 'next'

const config: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/policies',
        destination: 'https://merchant.razorpay.com/policy/QNVDlKEghhqNcJ/terms', // replace with your actual URL
        permanent: false, // true for 308 Permanent, false for 307 Temporary
      },
    ]
  },
}

export default config
