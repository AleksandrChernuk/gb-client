import { routing } from '@/shared/i18n/routing';
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

const PROTECTED_PATHS = ['/profile'];

export default async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isProtected = PROTECTED_PATHS.some((path) => pathname.includes(path));

  // Проверяем наличие токенов для рефреша
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const deviceId = request.cookies.get('deviceId')?.value;

  // Если есть refreshToken и deviceId, но нет accessToken - рефреш
  if (!accessToken && refreshToken && deviceId) {
    try {
      const refreshResponse = await fetch(new URL('/api/auth/refresh', request.url), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `refreshToken=${refreshToken}; deviceId=${deviceId}`,
          'Accept-Language': request.headers.get('accept-language') || 'en',
        },
      });

      if (refreshResponse.ok) {
        // Получаем новые куки из ответа
        const setCookieHeaders = refreshResponse.headers.getSetCookie();

        // Ответ с интернационализацией
        const response = intlMiddleware(request);

        // Добавляем новые куки к ответу
        setCookieHeaders.forEach((cookieHeader) => {
          response.headers.append('Set-Cookie', cookieHeader);
        });

        return response;
      }
    } catch (error) {
      console.error('Middleware refresh failed:', error);
    }
  }

  // Для защищенных маршрутов проверяем наличие токенов
  if (isProtected) {
    // После рефреша перепроверяем accessToken
    const currentAccessToken = request.cookies.get('accessToken')?.value;
    const currentRefreshToken = request.cookies.get('refreshToken')?.value;

    if (!currentAccessToken && !currentRefreshToken) {
      const locale = pathname.split('/')[1] || routing.defaultLocale;
      return redirectToSignin(request, locale);
    }
  }

  if (pathname.startsWith('/payment-result/') && request.method === 'POST') {
    return NextResponse.redirect(request.nextUrl, 302);
  }

  return intlMiddleware(request);
}

function redirectToSignin(request: NextRequest, locale: string) {
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}/signin`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    '/((?!sitemap\\.xml|robots\\.txt|favicon\\.ico|_next|api|.*\\.(?:png|jpg|jpeg|webp|svg|ico|gif|xml)$).*)',
    '/(en|uk|ru)/:path*',
  ],
};
