import { routing } from '@/shared/i18n/routing';
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

const PROTECTED_PATHS = ['/profile'];

// SEO: апгрейдим 307 → 308 для постоянных редиректов локали
function upgradeRedirectForSEO(response: NextResponse, request: NextRequest): NextResponse {
  // Только для GET и HEAD — для остальных методов 307 правильный, чтобы сохранить body
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return response;
  }

  // Только если это редирект
  if (response.status !== 307) {
    return response;
  }

  const location = response.headers.get('location');
  if (!location) {
    return response;
  }

  // Создаём новый 308 редирект, но сохраняем все cookies от next-intl
  const newResponse = NextResponse.redirect(new URL(location, request.url), 308);

  // Копируем Set-Cookie заголовки (NEXT_LOCALE и т.п.)
  response.headers.getSetCookie().forEach((cookie) => {
    newResponse.headers.append('Set-Cookie', cookie);
  });

  return newResponse;
}

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isProtected = PROTECTED_PATHS.some((path) => pathname.includes(path));

  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const deviceId = request.cookies.get('deviceId')?.value;

  // 🔄 refresh токена - НАПРЯМУЮ к бэкенду, не через /api/auth/refresh
  if (!accessToken && refreshToken && deviceId) {
    try {
      const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

      if (backendUrl) {
        const refreshResponse = await fetch(`${backendUrl}/auth/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Cookie: `refreshToken=${refreshToken}; deviceId=${deviceId}`,
            'Accept-Language': request.headers.get('accept-language') || 'en',
          },
        });

        if (refreshResponse.ok) {
          const response = intlMiddleware(request);
          refreshResponse.headers.getSetCookie().forEach((cookie) => {
            response.headers.append('Set-Cookie', cookie);
          });
          return upgradeRedirectForSEO(response, request);
        }

        const response = intlMiddleware(request);
        response.cookies.delete('accessToken');
        response.cookies.delete('refreshToken');
        return upgradeRedirectForSEO(response, request);
      }
    } catch (e) {
      console.error('Middleware refresh failed:', e);
      const response = intlMiddleware(request);
      response.cookies.delete('accessToken');
      response.cookies.delete('refreshToken');
      return upgradeRedirectForSEO(response, request);
    }
  }

  if (isProtected && !accessToken && !refreshToken) {
    const locale = pathname.split('/')[1] || routing.defaultLocale;
    return redirectToSignin(request, locale);
  }

  if (pathname.startsWith('/payment-result/') && request.method === 'POST') {
    const url = request.nextUrl.clone();
    return NextResponse.redirect(url, 302);
  }

  // 👉 Возвращаем intl response + SEO upgrade
  return upgradeRedirectForSEO(intlMiddleware(request), request);
}

function redirectToSignin(request: NextRequest, locale: string) {
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}/signin/`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|sitemap\\.xml|robots\\.txt|manifest\\.webmanifest|favicon\\.ico|.*\\..*$).*)'],
};
