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

  let body: { email?: string };

  try {
    body = await req.json();
  } catch {
    return createJsonResponse({ message: 'Invalid JSON' }, 400);
  }

  if (!body.email) {
    return createJsonResponse({ message: 'Email is required' }, 400);
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!accessToken && !refreshToken) {
    return createJsonResponse({ message: 'Authentication required' }, 401);
  }

  const headersToBackend = forwardHeaders(req, {
    forceJsonContentType: true,
    include: {
      'Accept-Language': req.headers.get('accept-language') || 'en',
      Cookie: [accessToken && `accessToken=${accessToken}`, refreshToken && `refreshToken=${refreshToken}`]
        .filter(Boolean)
        .join('; '),
    },
  });

  let response: Response;

  try {
    response = await fetch(`${BACKEND_URL}/api/v1/users/deactivate`, {
      method: 'POST',
      headers: headersToBackend,
      body: JSON.stringify(body),
    });
  } catch {
    return createJsonResponse({ message: 'Backend service unavailable' }, 503);
  }

  const text = await response.text();
  let data: { message?: string; email?: string } = {};

  try {
    data = text ? JSON.parse(text) : data;
  } catch {
    // игнорируем ошибку
  }

  if (!response.ok) {
    return createJsonResponse({ message: data.message || 'Failed to request account deletion' }, response.status);
  }

  return createJsonResponse(
    {
      message: data.message || 'Account deletion request sent',
      email: body.email,
    },
    200,
    {
      'Cache-Control': 'no-store',
    },
  );
}
