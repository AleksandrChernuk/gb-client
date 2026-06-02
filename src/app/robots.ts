import { MetadataRoute } from 'next';
import { BASE_URL } from '@/shared/configs/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/_next/static/', '/_next/image'],
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
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
