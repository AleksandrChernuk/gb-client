import { BACKEND_URL } from '@/shared/configs/constants';
import { createJsonResponse } from '@/shared/utils/jsonResponse.util';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  if (!BACKEND_URL) {
    return createJsonResponse({ message: 'Service temporarily unavailable' }, 503);
  }

  const url = new URL(req.url);
  const locale = url.searchParams.get('locale') ?? 'en';

  const supportedLocales = ['en', 'uk', 'ru'];
  const validLocale = supportedLocales.includes(locale) ? locale : 'en';

  return NextResponse.redirect(`${BACKEND_URL}/api/v1/auth/google?locale=${encodeURIComponent(validLocale)}`, {
    status: 302,
  });
}
