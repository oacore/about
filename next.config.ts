import type { NextConfig } from 'next'

import envConfig from './env.config.js'

const nextConfig: NextConfig = {
  env: {
    API_URL: process.env.API_URL || envConfig.API_URL,
    GA_CODE: process.env.GA_CODE ?? 'GA',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'oacore.github.io',
        pathname: '/content/**',
      },
      {
        protocol: 'https',
        hostname: 'core.ac.uk',
        pathname: '/images/**',
      },
    ],
  },
  turbopack: {
    root: process.cwd(),
  },
  //TODO  Legacy URLs (old about repo legacy.config.yml)
  async redirects() {
    return [
      {
        source: '/documentation/discovery/plugin',
        destination: '/documentation/discovery-plugin',
        permanent: true,
      },
      {
        source: '/documentations',
        destination: '/documentation/membership-documentation',
        permanent: true,
      },
      {
        source: '/membership-documentation',
        destination: '/documentation/membership-documentation',
        permanent: true,
      },
      { source: '/services/repository-edition', destination: '/', permanent: true },
      // The SDG page lives at /sdg here; the old site (and content links) used /labs/sdg
      { source: '/labs/sdg', destination: '/sdg', permanent: true },
    ]
  },
}

export default nextConfig
