import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif'],
    minimumCacheTTL: 2678400,
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
  reactStrictMode: false,
};

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

export default withNextIntl(nextConfig);
