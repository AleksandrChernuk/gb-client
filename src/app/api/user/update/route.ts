import { BACKEND_URL } from '@/shared/configs/constants';
import { forwardHeaders } from '@/shared/utils/headers.util';
import { createJsonResponse } from '@/shared/utils/jsonResponse.util';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function PATCH(req: Request) {
  if (!BACKEND_URL) {
    return createJsonResponse({ message: 'BACKEND_URL is not configured' }, 500);
  }

  let body: {
    userName?: string;
    picture?: string;
    newEmail?: string;
    currentPassword?: string;
    twoFA?: boolean;
  };

  try {
    body = await req.json();
  } catch {
    return createJsonResponse({ message: 'Invalid JSON' }, 400);
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
    response = await fetch(`${BACKEND_URL}/api/v1/users/update`, {
      method: 'PATCH',
      headers: headersToBackend,
      body: JSON.stringify(body),
    });
  } catch {
    return createJsonResponse({ message: 'Backend service unavailable' }, 503);
  }

  const text = await response.text();
  let data: {
    message?: string;
    user?: {
      id: string;
      userName: string;
      picture?: string;
      email: string;
      twoFA: boolean;
    };
  } = {};

  try {
    data = text ? JSON.parse(text) : data;
  } catch {
    // игнорируем ошибку
  }

  if (!response.ok) {
    return createJsonResponse({ message: data.message || 'Failed to update user' }, response.status);
  }

  // Если изменялся email или 2FA, токены могут быть инвалидированы на бэкенде
  const sensitiveFieldsChanged = body.newEmail !== undefined || body.twoFA !== undefined;

  if (sensitiveFieldsChanged) {
    // Очищаем куки если были изменены критичные поля
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
  }

  return createJsonResponse(
    {
      message: data.message || 'Profile updated successfully',
      user: data.user || null,
    },
    200,
    {
      'Cache-Control': 'no-store',
      Vary: 'Cookie',
    },
  );
}
