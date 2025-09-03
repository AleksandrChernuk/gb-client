import { BACKEND_URL } from '@/config/constants';
import { forwardHeaders } from '@/utils/headers.util';
import { createJsonResponse } from '@/utils/jsonResponse.util';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function DELETE(req: Request) {
  if (!BACKEND_URL) {
    return createJsonResponse({ message: 'BACKEND_URL is not configured' }, 500);
  }

  let body: { code?: string; email?: string };

  try {
    body = await req.json();
  } catch {
    return createJsonResponse({ message: 'Invalid JSON' }, 400);
  }

  if (!body.code || !body.email) {
    return createJsonResponse({ message: 'Code and email are required' }, 400);
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
      Cookie: [accessToken && `accessToken=${accessToken}`, refreshToken && `refreshToken=${refreshToken}`]
        .filter(Boolean)
        .join('; '),
    },
  });

  let response: Response;

  try {
    response = await fetch(`${BACKEND_URL}/api/v1/users/delete`, {
      method: 'DELETE',
      headers: headersToBackend,
      body: JSON.stringify(body),
    });
  } catch {
    return createJsonResponse({ message: 'Backend service unavailable' }, 503);
  }

  const text = await response.text();
  let data: { message?: string } = {};

  try {
    data = text ? JSON.parse(text) : data;
  } catch {
    // игнорируем ошибку парсинга
  }

  if (!response.ok) {
    return createJsonResponse({ message: data.message || 'Failed to delete account' }, response.status);
  }

  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');
  cookieStore.delete('deviceId');

  return createJsonResponse(
    {
      message: data.message || 'Account successfully deleted',
    },
    200,
    {
      'Cache-Control': 'no-store',
    },
  );
}
