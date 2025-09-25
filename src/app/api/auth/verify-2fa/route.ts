import { BACKEND_URL } from '@/shared/configs/constants';
import { Verify2FAResponse } from '@/shared/types/auth.types';
import { set2FACookies } from '@/shared/utils/cookieBase.util';
import { forwardHeaders } from '@/shared/utils/headers.util';
import { createJsonResponse } from '@/shared/utils/jsonResponse.util';
import { cookies } from 'next/headers';

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

  const cookieStore = await cookies();

  const existingDeviceId = cookieStore.get('deviceId')?.value;

  const headersToBackend = forwardHeaders(req, {
    forceJsonContentType: true,
    include: {
      'Accept-Language': req.headers.get('accept-language') || 'en',
      ...(existingDeviceId && { Cookie: `deviceId=${existingDeviceId}` }),
    },
  });

  let response: Response;

  try {
    response = await fetch(`${BACKEND_URL}/api/v1/auth/verify-2fa`, {
      method: 'POST',
      headers: headersToBackend,
      body: JSON.stringify(body),
    });
  } catch {
    return createJsonResponse({ message: 'Backend service unavailable' }, 503);
  }

  const text = await response.text();

  let data: Verify2FAResponse = { message: 'Verify 2FA failed' };

  try {
    data = text ? (JSON.parse(text) as Verify2FAResponse) : data;
  } catch {
    // игнорим ошибку, показываем дефолтное сообщение
  }

  if (!response.ok) {
    return createJsonResponse({ message: data.message || 'Two-factor authentication failed' }, response.status);
  }

  await set2FACookies(data);

  return createJsonResponse(
    {
      message: data.message || '2FA verification successful',
      currentUser: data.currentUser,
    },
    200,
    {
      'Cache-Control': 'no-store',
      Vary: 'Cookie',
    },
  );
}
