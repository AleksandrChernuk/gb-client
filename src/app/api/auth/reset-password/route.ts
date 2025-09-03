import { BACKEND_URL } from '@/config/constants';
import { clearAllAuthCookies } from '@/utils/cookieBase.util';
import { forwardHeaders } from '@/utils/headers.util';
import { createJsonResponse } from '@/utils/jsonResponse.util';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

type ResetPayload = { code: string; newPassword: string };
type BackendMessage = { message: string };

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}

function hasMessage(v: unknown): v is BackendMessage {
  if (!isRecord(v)) return false;
  return typeof v['message'] === 'string';
}

function validateResetPayload(body: unknown): body is { code: string; newPassword: string } {
  return (
    isRecord(body) &&
    typeof body.code === 'string' &&
    typeof body.newPassword === 'string' &&
    body.code.length > 0 &&
    body.newPassword.length > 0
  );
}

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

  if (!validateResetPayload(body)) {
    return createJsonResponse({ message: 'Code and new password are required' }, 400);
  }

  const payload: ResetPayload = {
    code: body.code.trim(),
    newPassword: body.newPassword,
  };

  if (!/^\d{6}$/.test(payload.code)) {
    return createJsonResponse({ message: 'Invalid verification code format' }, 400);
  }

  const headersToBackend = forwardHeaders(req, {
    forceJsonContentType: true,
    include: {
      'Accept-Language': req.headers.get('accept-language') || 'en',
    },
  });

  let response: Response;
  try {
    response = await fetch(`${BACKEND_URL}/api/v1/auth/reset-password`, {
      method: 'POST',
      headers: headersToBackend,
      body: JSON.stringify(payload),
    });
  } catch {
    return createJsonResponse({ message: 'Backend service unavailable' }, 503);
  }

  const text = await response.text();

  let parsed: unknown;

  try {
    parsed = text ? JSON.parse(text) : undefined;
  } catch {
    parsed = undefined;
  }

  if (response.ok) {
    await clearAllAuthCookies();

    const message = hasMessage(parsed) ? parsed.message : 'Password successfully reset';

    return createJsonResponse({ message }, 200, {
      'Cache-Control': 'no-store',
      Vary: 'Cookie',
    });
  }

  const message = hasMessage(parsed) ? parsed.message : 'Password reset failed';

  return createJsonResponse({ message }, response.status, {
    'Cache-Control': 'no-store',
  });
}
