import { BACKEND_URL } from '@/config/constants';
import { RefreshResponse } from '@/types/auth.types';
import { setRefreshCookies } from '@/utils/cookieBase.util';
import { forwardHeaders } from '@/utils/headers.util';
import { createJsonResponse } from '@/utils/jsonResponse.util';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: Request) {
  if (!BACKEND_URL) {
    return createJsonResponse({ message: 'BACKEND_URL is not configured' }, 500);
  }

  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;
  const deviceId = cookieStore.get('deviceId')?.value;

  // Ранний отказ
  if (!refreshToken || !deviceId) {
    return createJsonResponse({ message: 'Missing refreshToken or deviceId' }, 400);
  }

  const headersToBackend = forwardHeaders(req, {
    include: {
      Cookie: `refreshToken=${refreshToken}; deviceId=${deviceId}`,
      'Accept-Language': req.headers.get('accept-language') || 'en',
    },
  });

  let resp: Response;

  try {
    resp = await fetch(`${BACKEND_URL}/api/v1/auth/refresh`, {
      method: 'POST',
      headers: headersToBackend,
    });
  } catch {
    return createJsonResponse({ message: 'Backend service unavailable' }, 503);
  }

  if (!resp.ok) {
    // вернём реальный текст ошибки с бэка
    const text = await resp.text();
    let message = 'Unauthorized';
    try {
      const parsed = JSON.parse(text) as { message?: string };
      if (parsed?.message) message = parsed.message;
    } catch {
      /* ignore */
    }

    return createJsonResponse({ message }, resp.status, {
      'Cache-Control': 'no-store',
      Vary: 'Cookie',
    });
  }

  let data: RefreshResponse;
  try {
    data = (await resp.json()) as RefreshResponse;
  } catch {
    return createJsonResponse({ message: 'Invalid backend response' }, 502);
  }

  // Устанавливаем новые cookies
  await setRefreshCookies(data);

  return createJsonResponse({ message: data.message || 'Refresh success' }, 200, {
    'Cache-Control': 'no-store',
    Vary: 'Cookie',
  });
}
