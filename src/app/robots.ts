import { MetadataRoute } from 'next';
import { host } from '@/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/_next/',
          '/api/',
          '/*/signin',
          '/*/signup',
          '/*/callback',
          '/*/forgot-password',
          '/*/reset-password',
          '/*/change-password',
          '/*/confirm-delete-account',
          '/*/verify-2FA',
          '/*/verify-delete-account',
          '/*/verify-email',
          '/*/profile',
          '/*/buses',
          '/*/checkout',
          '/*/payment-result',
        ],
      },
    ],
    sitemap: `${host}/sitemap.xml`,
  };
}
