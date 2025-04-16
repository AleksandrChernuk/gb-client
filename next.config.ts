import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const securityHeaders: NextConfig['headers'] = async () => {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value:
            "default-src 'self'; " +
            "script-src 'self' https://cdn.jsdelivr.net 'unsafe-inline'; " +
            "style-src 'self' https://fonts.googleapis.com 'unsafe-inline'; " +
            "font-src 'self' https://fonts.gstatic.com; " +
            "img-src 'self' data:; " +
            "object-src 'none'; " +
            "connect-src 'self'; " +
            'upgrade-insecure-requests;',
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=(), fullscreen=(self)',
        },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload',
        },
      ],
    },
  ];
};

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif'],
    minimumCacheTTL: 2678400,
  },
  reactStrictMode: false,
  headers: securityHeaders,
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
