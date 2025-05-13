import type { NextConfig } from 'next'

const config: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't resolve 'fs', 'child_process', etc on the client
      config.resolve.fallback = {
        ...config.resolve.fallback,
        child_process: false,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
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
