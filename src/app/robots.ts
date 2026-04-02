import { MetadataRoute } from 'next';
import { host } from '@/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/opengraph-image',
          '/_next/static',
          '/_next/image',
          '/api',
          '/signin',
          '/signup',
          '/callback',
          '/forgot-password',
          '/reset-password',
          '/change-password',
          '/confirm-delete-account',
          '/verify-2FA',
          '/verify-delete-account',
          '/verify-email',
          '/profile',
          '/buses',
          '/checkout',
          '/payment-result',
          '/route-planner',
          '/carriers',
          '/agents',
          '/*?*',
        ],
      },
    ],
    sitemap: `${host}/sitemap.xml`,
  };
}
