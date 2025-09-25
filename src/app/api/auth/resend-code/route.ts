import { TypeResendCode } from '@/shared/types/auth.types';
import { BACKEND_URL } from '@/shared/configs/constants';
import { forwardHeaders } from '@/shared/utils/headers.util';
import { createJsonResponse } from '@/shared/utils/jsonResponse.util';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: Request) {
  if (!BACKEND_URL) {
    return createJsonResponse({ message: 'BACKEND_URL is not configured' }, 500);
  }

  let data: TypeResendCode;
  try {
    data = await req.json();
  } catch {
    return createJsonResponse({ message: 'Invalid JSON' }, 400);
  }

  const headersToBackend = forwardHeaders(req, {
    forceJsonContentType: true,
    include: {
      'Accept-Language': req.headers.get('accept-language') || 'en',
    },
  });

  let response: Response;
  try {
    response = await fetch(`${BACKEND_URL}/api/v1/auth/resend-code`, {
      method: 'POST',
      headers: headersToBackend,
      body: JSON.stringify(data),
    });
  } catch {
    return createJsonResponse({ message: 'Backend service unavailable' }, 503);
  }

  let payload: { message?: string };
  try {
    payload = await response.json();
  } catch {
    payload = {};
  }

  if (!response.ok) {
    return createJsonResponse({ message: payload.message || 'Code send failed' }, response.status);
  }

  return createJsonResponse(
    {
      message: payload.message || 'Code resent successfully',
    },
    200,
  );
}
