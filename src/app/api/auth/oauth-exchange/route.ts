import { ExchangeResponse } from '@/shared/types/auth.types';
import { BACKEND_URL } from '@/shared/configs/constants';
import { createJsonResponse } from '@/shared/utils/jsonResponse.util';
import { setOAuthCookies } from '@/shared/utils/cookieBase.util';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(req: Request) {
  if (!BACKEND_URL) {
    return createJsonResponse({ message: 'BACKEND_URL is not configured' }, 500);
  }

  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  if (!code) {
    return createJsonResponse({ message: 'Missing authorization code' }, 400);
  }

  let resp: Response;
  try {
    resp = await fetch(`${BACKEND_URL}/api/v1/auth/oauth-exchange?code=${encodeURIComponent(code)}`);
  } catch {
    return createJsonResponse({ message: 'Backend service unavailable' }, 503);
  }

  const text = await resp.text();
  if (!resp.ok) {
    let message = 'OAuth exchange failed';
    try {
      const errorData = JSON.parse(text) as { message?: string };
      if (errorData?.message) message = errorData.message;
    } catch {
      // ignore parsing errors
    }
    return createJsonResponse({ message }, resp.status);
  }

  let data: ExchangeResponse;

  try {
    data = JSON.parse(text) as ExchangeResponse;
  } catch {
    return createJsonResponse({ message: 'Invalid backend response' }, 502);
  }

  await setOAuthCookies(data);

  const normalizedUser = data.currentUser ?? data.user ?? null;

  return createJsonResponse(
    {
      message: data.message || 'OAuth signin successful',
      currentUser: normalizedUser,
    },
    200,
    {
      'Cache-Control': 'no-store',
      Vary: 'Cookie',
    },
  );
}
