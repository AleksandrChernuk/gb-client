import { BACKEND_URL } from '@/config/constants';
import { TypeSignup } from '@/types/auth.types';
import { forwardHeaders } from '@/utils/headers.util';
import { createJsonResponse } from '@/utils/jsonResponse.util';
import { validateSignupPayload } from '@/utils/validatePayload.util';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: Request) {
  if (!BACKEND_URL) {
    return createJsonResponse({ message: 'BACKEND_URL is not configured' }, 500);
  }

  let payloadUnknown: unknown;

  try {
    payloadUnknown = await req.json();
  } catch {
    return createJsonResponse({ message: 'Invalid JSON' }, 400);
  }

  if (!validateSignupPayload(payloadUnknown)) {
    return createJsonResponse({ message: 'Email and password are required' }, 400);
  }

  const payload: TypeSignup = {
    ...(payloadUnknown as Record<string, unknown>),
    email: payloadUnknown.email.trim().toLowerCase(),
    password: payloadUnknown.password as string,
  } as TypeSignup;

  const headersToBackend = forwardHeaders(req, {
    forceJsonContentType: true,
    include: {
      'Accept-Language': req.headers.get('accept-language') || 'en',
    },
  });

  let response: Response;

  try {
    response = await fetch(`${BACKEND_URL}/api/v1/auth/signup`, {
      method: 'POST',
      headers: headersToBackend,
      body: JSON.stringify(payload),
    });
  } catch {
    return createJsonResponse({ message: 'Backend service unavailable' }, 503);
  }

  const text = await response.text();

  let data: unknown = {};

  try {
    data = text ? (JSON.parse(text) as unknown) : {};
  } catch {
    data = {};
  }

  return createJsonResponse(data, response.status, {
    'Cache-Control': 'no-store',
  });
}
