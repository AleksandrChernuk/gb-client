import { MetadataRoute } from 'next';
import { host } from '@/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
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
          '/*/checkout',
          '/*/payment-result',
          '/*?*',
          '/_next/',
        ],
      },
    ],
    sitemap: `${host}/sitemap.xml`,
  };
}
