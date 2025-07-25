import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

export default createMiddleware(routing);

const intlMiddleware = createMiddleware(routing);

const PROTECTED_PATHS = ['/profile', '/dashboard'];

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const isProtected = PROTECTED_PATHS.some((path) => pathname.includes(path));

  if (isProtected) {
    const accessToken = req.cookies.get('accessToken')?.value;
    const refreshToken = req.cookies.get('refreshToken')?.value;

    if (!accessToken && !refreshToken) {
      const locale = pathname.split('/')[1] || routing.defaultLocale;
      return redirectToSignin(req, locale);
    }
  }
  if (pathname.startsWith('/payment-result/') && req.method === 'POST') {
    return NextResponse.redirect(req.nextUrl, 302);
  }

  return intlMiddleware(req);
}

function redirectToSignin(req: NextRequest, locale: string) {
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}/signin`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/', '/(en|ru|uk)/:path*', '/((?!api|trpc|_next|_vercel|.*\\..*).*)'],
};
