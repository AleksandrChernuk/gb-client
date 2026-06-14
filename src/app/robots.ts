import { MetadataRoute } from 'next';
import { BASE_URL } from '@/shared/configs/constants';

// Приватні розділи закриваємо однаково для всіх ботів, зокрема AI-краулерів.
const PRIVATE_DISALLOW = [
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
  '/_next/',
];

// Боти, яким явно дозволяємо публічний контент для AI-цитування
// (Google AI Overviews, ChatGPT, Perplexity, Claude, Apple Intelligence тощо).
// Явні правила прибирають двозначність для краулерів, які за відсутності
// власного запису трактують доступ консервативно.
const AI_BOTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'Perplexity-User',
  'ClaudeBot',
  'Claude-User',
  'anthropic-ai',
  'Google-Extended',
  'Applebot-Extended',
  'cohere-ai',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/_next/static/', '/_next/image'],
        disallow: PRIVATE_DISALLOW,
      },
      {
        userAgent: AI_BOTS,
        allow: '/',
        disallow: PRIVATE_DISALLOW,
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
