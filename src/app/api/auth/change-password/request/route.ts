import { BACKEND_URL } from '@/config/constants';
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
  const accessToken = cookieStore.get('accessToken')?.value;
  const deviceId = cookieStore.get('deviceId')?.value;

  if (!accessToken) {
    return createJsonResponse({ message: 'Authentication required' }, 401);
  }

  let body: { email?: string };

  try {
    body = await req.json();
  } catch {
    body = {};
  }

  const cookieParts: string[] = [];
  if (accessToken) cookieParts.push(`accessToken=${accessToken}`);
  if (deviceId) cookieParts.push(`deviceId=${deviceId}`);

  const headersToBackend = forwardHeaders(req, {
    forceJsonContentType: true,
    include: {
      'Accept-Language': req.headers.get('accept-language') || 'en',
      ...(cookieParts.length > 0 && { Cookie: cookieParts.join('; ') }),
    },
  });

  let response: Response;

  try {
    response = await fetch(`${BACKEND_URL}/api/v1/auth/change-password/request`, {
      method: 'POST',
      headers: headersToBackend,
    });
  } catch {
    return createJsonResponse({ message: 'Backend service unavailable' }, 503);
  }

  let data: { message?: string };

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    return createJsonResponse({ message: data.message || 'Failed to send password change code' }, response.status);
  }

  return createJsonResponse(
    {
      message: data.message || 'Password change code sent',
      email: body.email,
    },
    200,
    {
      'Cache-Control': 'no-store',
    },
  );
}
