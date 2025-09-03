import { BACKEND_URL } from '@/config/constants';
import { createJsonResponse } from '@/utils/jsonResponse.util';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(req: Request, ctx: { params: Promise<{ userId: string }> }) {
  if (!BACKEND_URL) {
    return createJsonResponse({ message: 'BACKEND_URL is not configured' }, 500);
  }

  const { userId } = await ctx.params;
  const { searchParams } = new URL(req.url);

  const page = searchParams.get('page');
  const perPage = searchParams.get('perPage');

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!accessToken && !refreshToken) {
    return createJsonResponse({ message: 'Authentication required' }, 401);
  }

  const backendUrl = new URL(`${BACKEND_URL}/api/v1/users/orders/${userId}`);

  if (page) {
    backendUrl.searchParams.append('page', page);
  }

  if (perPage) {
    backendUrl.searchParams.append('perPage', perPage);
  }

  const headersToBackend = {
    'Content-Type': 'application/json',
    'Accept-Language': req.headers.get('accept-language') || 'en',
    Cookie: [accessToken && `accessToken=${accessToken}`, refreshToken && `refreshToken=${refreshToken}`]
      .filter(Boolean)
      .join('; '),
  };

  let response: Response;

  try {
    response = await fetch(backendUrl.toString(), {
      method: 'GET',
      headers: headersToBackend,
    });
  } catch (error) {
    console.error('Backend request failed:', error);
    return createJsonResponse({ message: 'Backend service unavailable' }, 503);
  }

  const text = await response.text();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let data: { message?: string; [key: string]: any } = {};

  try {
    data = text ? JSON.parse(text) : {};
  } catch (error) {
    console.error('Failed to parse backend response:', error);
    return createJsonResponse({ message: 'Invalid backend response' }, 500);
  }

  if (!response.ok) {
    return createJsonResponse(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { message: (data as any).message || 'Failed to fetch user orders' },
      response.status,
    );
  }

  return createJsonResponse(data, 200, {
    'Cache-Control': 'no-store',
    Vary: 'Cookie',
  });
}
