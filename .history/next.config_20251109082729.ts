import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Редирект /uk на главную
      {
        source: '/uk',
        destination: '/',
        permanent: true, // 301
      },
      // Редирект всех страниц с /uk/... на /...
      {
        source: '/uk/:path*',
        destination: '/:path*',
        permanent: true, // 301
      },
      // Старый редирект
      {
        source: '/route-planner',
        destination: '/',
        permanent: true,
      },
    ];
  },

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

  reactStrictMode: false,
};

const withNextIntl = createNextIntlPlugin('./src/shared/i18n/request.ts');

export default withNextIntl(nextConfig);
