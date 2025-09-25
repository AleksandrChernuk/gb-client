import { BACKEND_URL } from '@/shared/configs/constants';
import { clearAuthCookies } from '@/shared/utils/cookieBase.util';
import { forwardHeaders } from '@/shared/utils/headers.util';
import { createJsonResponse } from '@/shared/utils/jsonResponse.util';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: Request) {
  if (!BACKEND_URL) {
    return createJsonResponse({ message: 'BACKEND_URL is not configured' }, 500);
  }

  const store = await cookies();
  const refreshToken = store.get('refreshToken')?.value;
  const deviceId = store.get('deviceId')?.value;

  const cookieParts: string[] = [];
  if (refreshToken) cookieParts.push(`refreshToken=${refreshToken}`);
  if (deviceId) cookieParts.push(`deviceId=${deviceId}`);

  const headersToBackend = forwardHeaders(req, {
    include: {
      ...(cookieParts.length > 0 && { Cookie: cookieParts.join('; ') }),
      'Accept-Language': req.headers.get('accept-language') || 'en',
    },
  });

  let response: Response;

  try {
    response = await fetch(`${BACKEND_URL}/api/v1/auth/logout`, {
      method: 'POST',
      headers: headersToBackend,
    });
  } catch {
    // Если backend недоступен, всё равно очищаем куки локально
    await clearAuthCookies();
    return createJsonResponse({ message: 'Logged out locally' }, 200);
  }

  // Локально очищаем куки в любом случае
  await clearAuthCookies();

  if (!response.ok) {
    return createJsonResponse({ message: 'Logged out locally' }, 200);
  }

  let data;

  try {
    data = await response.json();
  } catch {
    data = { message: 'User logged out' };
  }

  return createJsonResponse(data, 200);
}
