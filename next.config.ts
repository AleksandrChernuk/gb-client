import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/route-planner',
        destination: '/',
        permanent: true,
      },
      {
        source: '/:lng/route-planner',
        destination: '/:lng',
        permanent: true,
      },
      {
        source: '/carriers',
        destination: '/for-carriers',
        permanent: true,
      },
      {
        source: '/:lng/carriers',
        destination: '/:lng/for-carriers',
        permanent: true,
      },
    ];
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2678400,
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'odri-ua.com' },
      { protocol: 'https', hostname: 'www.odri-ua.com' },
      { protocol: 'https', hostname: 'test-dispatcher.bussystem.eu', pathname: '/images/bus_foto/**' },
      { protocol: 'https', hostname: 'dispatcher.bussystem.eu', pathname: '/images/bus_foto/**' },
    ],
  },

  reactStrictMode: false,
  trailingSlash: true,

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },

  experimental: {
    optimizePackageImports: ['lucide-react', '@/shared/ui'],
  },

  poweredByHeader: false,
};

const withNextIntl = createNextIntlPlugin('./src/shared/i18n/request.ts');

export default withNextIntl(nextConfig);
