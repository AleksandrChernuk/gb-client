import { BACKEND_URL } from '@/config/constants';
import { SigninPending, SigninSuccess } from '@/types/auth.types';
import { clearAuthCookies, setAuthCookies } from '@/utils/cookieBase.util';
import { forwardHeaders } from '@/utils/headers.util';
import { createJsonResponse } from '@/utils/jsonResponse.util';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: Request) {
  if (!BACKEND_URL) {
    return createJsonResponse({ message: 'BACKEND_URL is not configured' }, 500);
  }

  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return createJsonResponse({ message: 'Invalid JSON' }, 400);
  }

  const headersToBackend = forwardHeaders(req, {
    forceJsonContentType: true,
    include: {
      'Accept-Language': req.headers.get('accept-language') || 'en',
    },
  });

  let response: Response;

  try {
    response = await fetch(`${BACKEND_URL}/api/v1/auth/verify-email`, {
      method: 'POST',
      headers: headersToBackend,
      body: JSON.stringify(body),
    });
  } catch {
    return createJsonResponse({ message: 'Backend service unavailable' }, 503);
  }

  const text = await response.text();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let data: any;

  try {
    data = JSON.parse(text);
  } catch {
    return createJsonResponse({ message: 'Bad backend response' }, 502);
  }

  if (!response.ok) {
    await clearAuthCookies();
    return createJsonResponse({ message: data?.message || 'Email verification failed' }, response.status);
  }

  // Код отправлен - куки НЕ ставим
  if (!data?.accessToken || !data?.refreshToken) {
    // Либо Verification, либо 2FA
    return createJsonResponse(data as SigninPending, 200, {
      'Cache-Control': 'no-store',
    });
  }

  // Успешная аутентификация - ставим куки
  await setAuthCookies(data as SigninSuccess);

  // Возвращаем компоненту только безопасную часть
  const safe = {
    message: data.message,
    currentUser: data.currentUser,
  } satisfies Pick<SigninSuccess, 'message' | 'currentUser'>;

  return createJsonResponse(safe, 200, {
    'Cache-Control': 'no-store',
  });
}
