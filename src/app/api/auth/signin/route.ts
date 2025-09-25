import { BACKEND_URL } from '@/shared/configs/constants';
import { SigninPending, SigninSuccess } from '@/shared/types/auth.types';
import { clearAuthCookies, setAuthCookies } from '@/shared/utils/cookieBase.util';
import { forwardHeaders } from '@/shared/utils/headers.util';
import { createJsonResponse } from '@/shared/utils/jsonResponse.util';

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
    response = await fetch(`${BACKEND_URL}/api/v1/auth/signin`, {
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
    return createJsonResponse({ message: data?.message || 'Signin failed' }, response.status);
  }

  // Если включена 2FA или почта не подтверждена - вернется message с текстом либо Verification, либо 2FA. Возвращаем текст, обрабатываем в компоненте.
  if (!data?.accessToken || !data?.refreshToken) {
    return createJsonResponse(data as SigninPending, 200, {
      'Cache-Control': 'no-store',
    });
  }

  // Успешная авторизация - устанавливаем cookies
  await setAuthCookies(data as SigninSuccess);

  // Возвращаем в компонент только безопасные данные
  const safe = {
    message: data.message,
    currentUser: data.currentUser,
  } satisfies Pick<SigninSuccess, 'message' | 'currentUser'>;

  return createJsonResponse(safe, 200, {
    'Cache-Control': 'no-store',
  });
}
