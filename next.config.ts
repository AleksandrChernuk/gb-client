import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif'],
    minimumCacheTTL: 2678400,
    qualities: [25, 50, 75],

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'odri-ua.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.odri-ua.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'test-dispatcher.bussystem.eu',
        port: '',
        pathname: '/images/bus_foto/**',
      },
      {
        protocol: 'https',
        hostname: 'dispatcher.bussystem.eu',
        port: '',
        pathname: '/images/bus_foto/**',
      },
    ],
  },
  optimizePackageImports: [
    'react-icons',
    '@radix-ui/react-accordion',
    '@radix-ui/react-dialog',
    '@radix-ui/react-dropdown-menu',
    '@radix-ui/react-select',
    '@radix-ui/react-tooltip',
    'react-hook-form',
    'zod',
    'clsx',
    'tailwind-merge',
  ],
  reactStrictMode: false,
};

const withNextIntl = createNextIntlPlugin('./src/shared/i18n/request.ts');

export default withNextIntl(nextConfig);
