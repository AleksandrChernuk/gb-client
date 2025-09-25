import { BACKEND_URL } from '@/shared/configs/constants';
import { createJsonResponse } from '@/shared/utils/jsonResponse.util';
import { cookies } from 'next/headers';

import { z } from 'zod';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export interface ICurrentUser {
  id: string;
  userName: string;
  email: string;
  picture?: string;
  twoFA: boolean;
  method: string;
}

const PictureSchema = z.preprocess((v) => (v === null || v === '' ? undefined : v), z.string().url().optional());

const CurrentUserSchema = z.object({
  id: z.string().min(1),
  userName: z.string().min(1),
  email: z.string().email(),
  picture: PictureSchema,
  twoFA: z.boolean(),
  method: z.string().min(1),
});

function pickSafeUser(payload: unknown): ICurrentUser {
  const p = CurrentUserSchema.parse(payload);
  return {
    id: p.id,
    userName: p.userName,
    email: p.email,
    picture: p.picture,
    twoFA: p.twoFA,
    method: p.method,
  };
}

export async function GET(req: Request) {
  if (!BACKEND_URL) {
    return createJsonResponse({ message: 'BACKEND_URL is not configured' }, 500);
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return createJsonResponse({ message: 'Authentication required' }, 401, {
      'Cache-Control': 'no-store',
      Vary: 'Cookie',
    });
  }

  const headersToBackend: Record<string, string> = {
    'Accept-Language': req.headers.get('accept-language') || 'en',
    Cookie: `accessToken=${accessToken}`,
  };

  let response: Response;

  try {
    response = await fetch(`${BACKEND_URL}/api/v1/users/profile`, {
      method: 'GET',
      headers: headersToBackend,
    });
  } catch (error) {
    console.error('Backend request failed:', error);
    return createJsonResponse({ message: 'Backend service unavailable' }, 503);
  }

  const ct = response.headers.get('content-type') || '';
  let raw: unknown = null;

  try {
    raw = ct.includes('json') ? await response.json() : await response.text();
  } catch {
    return createJsonResponse({ message: 'Bad backend response' }, 502, {
      'Cache-Control': 'no-store',
      Vary: 'Cookie',
    });
  }

  if (!response.ok) {
    const message =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (typeof raw === 'object' && raw && (raw as any).message) ||
      (typeof raw === 'string' ? raw : 'Failed to fetch profile');

    return createJsonResponse({ message }, response.status, {
      'Cache-Control': 'no-store',
      Vary: 'Cookie',
    });
  }

  try {
    const safe = pickSafeUser(raw);
    return createJsonResponse(safe, 200, {
      'Cache-Control': 'no-store',
      Vary: 'Cookie',
    });
  } catch (e) {
    console.error('Profile payload validation failed:', e);
    return createJsonResponse({ message: 'Invalid profile payload' }, 502, {
      'Cache-Control': 'no-store',
      Vary: 'Cookie',
    });
  }
}
