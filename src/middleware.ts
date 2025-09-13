import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

const PROTECTED_PATHS = ['/profile', '/dashboard'];

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const isProtected = PROTECTED_PATHS.some((path) => pathname.includes(path));

  // Проверяем наличие токенов для рефреша
  const accessToken = req.cookies.get('accessToken')?.value;
  const refreshToken = req.cookies.get('refreshToken')?.value;
  const deviceId = req.cookies.get('deviceId')?.value;

  // Если есть refreshToken и deviceId, но нет accessToken - рефреш
  if (!accessToken && refreshToken && deviceId) {
    try {
      const refreshResponse = await fetch(new URL('/api/auth/refresh', req.url), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `refreshToken=${refreshToken}; deviceId=${deviceId}`,
          'Accept-Language': req.headers.get('accept-language') || 'en',
        },
      });

      if (refreshResponse.ok) {
        // Получаем новые куки из ответа
        const setCookieHeaders = refreshResponse.headers.getSetCookie();

        // Ответ с интернационализацией
        const response = intlMiddleware(req);

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
    const currentAccessToken = req.cookies.get('accessToken')?.value;
    const currentRefreshToken = req.cookies.get('refreshToken')?.value;

    if (!currentAccessToken && !currentRefreshToken) {
      const locale = pathname.split('/')[1] || routing.defaultLocale;
      return redirectToSignin(req, locale);
    }
  }

  if (pathname.startsWith('/payment-result/') && req.method === 'POST') {
    return NextResponse.redirect(req.nextUrl, 302);
  }

  return createMiddleware(routing)(req);
}

function redirectToSignin(req: NextRequest, locale: string) {
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}/signin`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/', '/(en|uk|ru)/:path*'],
};
