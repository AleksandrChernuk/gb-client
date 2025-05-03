import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
// import { NextResponse, NextRequest } from 'next/server';

export default createMiddleware(routing);

// export default function middleware(req: NextRequest) {
//   if (req.method === 'OPTIONS') {
//     return new NextResponse(null, {
//       status: 204,
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
//         'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//       },
//     });
//   }

//   const response = intlMiddleware(req);

//   response.headers.set('Cache-Control', 'public, max-age=0, must-revalidate, stale-while-revalidate=60');

//   return response;
// }

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
