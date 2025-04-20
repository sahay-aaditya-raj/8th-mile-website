// next.config.ts
import type { NextConfig } from 'next'

const config: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // disables ESLint during builds
  },
  typescript: {
    ignoreBuildErrors: true, // disables TypeScript errors during builds
  },
}

export default config
