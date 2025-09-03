import { BACKEND_URL } from '@/config/constants';
import { forwardHeaders } from '@/utils/headers.util';
import { createJsonResponse } from '@/utils/jsonResponse.util';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

type ForgotPayload = { email: string };
type BackendMessage = { message: string };

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}

function hasMessage(v: unknown): v is BackendMessage {
  return isRecord(v) && typeof v.message === 'string';
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function validateForgotPayload(body: unknown): body is { email: string } {
  return isRecord(body) && typeof body.email === 'string' && body.email.length > 0;
}

export async function POST(req: Request) {
  if (!BACKEND_URL) {
    return createJsonResponse({ message: 'BACKEND_URL is not configured' }, 500);
  }

  let rawBody: unknown;

  try {
    rawBody = await req.json();
  } catch {
    return createJsonResponse({ message: 'Invalid JSON' }, 400);
  }

  if (!validateForgotPayload(rawBody)) {
    return createJsonResponse({ message: 'Email is required' }, 400);
  }

  const payload: ForgotPayload = {
    email: normalizeEmail(rawBody.email),
  };

  const headersToBackend = forwardHeaders(req, {
    forceJsonContentType: true,
    include: {
      'Accept-Language': req.headers.get('accept-language') || 'en',
    },
  });

  let response: Response;

  try {
    response = await fetch(`${BACKEND_URL}/api/v1/auth/forgot-password`, {
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
    parsed = text ? (JSON.parse(text) as unknown) : undefined;
  } catch {
    parsed = undefined;
  }

  if (response.ok) {
    const message = hasMessage(parsed) ? parsed.message : 'Password reset code sent to your email';

    return createJsonResponse({ message }, 200, {
      'Cache-Control': 'no-store',
    });
  }

  const message = hasMessage(parsed) ? parsed.message : 'Password reset request failed';

  return createJsonResponse({ message }, response.status, {
    'Cache-Control': 'no-store',
  });
}
