import { BACKEND_URL } from '@/shared/configs/constants';
import { ChangePasswordConfirm } from '@/shared/types/auth.types';
import { setChangePasswordCookies } from '@/shared/utils/cookieBase.util';
import { forwardHeaders } from '@/shared/utils/headers.util';
import { createJsonResponse } from '@/shared/utils/jsonResponse.util';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}

// Валидация входных данных
function validateChangePasswordPayload(body: unknown): body is ChangePasswordConfirm {
  if (!isRecord(body)) return false;

  return (
    typeof body.code === 'string' &&
    typeof body.currentPassword === 'string' &&
    typeof body.newPassword === 'string' &&
    body.code.length > 0 &&
    body.currentPassword.length > 0 &&
    body.newPassword.length > 0
  );
}

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

  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return createJsonResponse({ message: 'Invalid JSON' }, 400);
  }

  if (!validateChangePasswordPayload(body)) {
    return createJsonResponse({ message: 'Code, current password and new password are required' }, 400);
  }

  if (!/^\d{6}$/.test(body.code)) {
    return createJsonResponse({ message: 'Invalid verification code format' }, 400);
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
    response = await fetch(`${BACKEND_URL}/api/v1/auth/change-password/confirm`, {
      method: 'POST',
      headers: headersToBackend,
      body: JSON.stringify(body),
    });
  } catch {
    return createJsonResponse({ message: 'Backend service unavailable' }, 503);
  }

  let data: {
    message?: string;
    accessToken?: string;
    refreshToken?: string;
    currentUser?: unknown;
    deviceId?: string;
  };

  try {
    data = await response.json();
  } catch {
    return createJsonResponse({ message: 'Invalid backend response' }, 502);
  }

  if (!response.ok) {
    return createJsonResponse({ message: data.message || 'Password change failed' }, response.status);
  }

  if (data.accessToken && data.refreshToken) {
    try {
      await setChangePasswordCookies({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        deviceId: data.deviceId,
      });
    } catch (error) {
      console.error('Failed to set auth cookies after password change:', error);
    }
  }

  const safeResponse = {
    message: data.message || 'Password changed successfully',
    currentUser: data.currentUser || null,
  };

  return createJsonResponse(safeResponse, 200, {
    'Cache-Control': 'no-store',
    Vary: 'Cookie',
  });
}
