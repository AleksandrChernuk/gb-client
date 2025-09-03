import { BACKEND_URL } from '@/config/constants';
import { forwardHeaders } from '@/utils/headers.util';
import { createJsonResponse } from '@/utils/jsonResponse.util';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface ValidateOk {
  authenticated: boolean;
}

interface ValidateFail {
  authenticated: false;
  reason?: string;
}

export async function GET(req: Request) {
  if (!BACKEND_URL) {
    return createJsonResponse(
      {
        authenticated: false,
        reason: 'Service configuration error',
      } as ValidateFail,
      200,
      {
        'Cache-Control': 'no-store',
        Vary: 'Cookie',
      },
    );
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const deviceId = cookieStore.get('deviceId')?.value;

  const cookieParts: string[] = [];
  if (accessToken) cookieParts.push(`accessToken=${accessToken}`);
  if (deviceId) cookieParts.push(`deviceId=${deviceId}`);

  const headersToBackend = forwardHeaders(req, {
    include: {
      ...(cookieParts.length > 0 && { Cookie: cookieParts.join('; ') }),
      'Accept-Language': req.headers.get('accept-language') || 'en',
    },
  });

  let response: Response;

  try {
    response = await fetch(`${BACKEND_URL}/api/v1/auth/validate`, {
      method: 'GET',
      headers: headersToBackend,
    });
  } catch {
    return createJsonResponse(
      {
        authenticated: false,
        reason: 'Backend service unavailable',
      } as ValidateFail,
      200,
      {
        'Cache-Control': 'no-store',
        Vary: 'Cookie',
      },
    );
  }

  const commonHeaders = {
    'Cache-Control': 'no-store',
    Vary: 'Cookie',
  } as const;

  if (response.ok) {
    const body: ValidateOk = { authenticated: true };
    return createJsonResponse(body, 200, commonHeaders);
  }

  let reason = 'unauthorized';

  try {
    const text = await response.text();
    const parsed = JSON.parse(text) as { message?: string };
    if (parsed?.message) reason = parsed.message;
  } catch {
    // игнор
  }

  const body: ValidateFail = { authenticated: false, reason };

  return createJsonResponse(body, 200, commonHeaders);
}
