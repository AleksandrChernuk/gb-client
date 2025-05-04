import { forwardHeaders } from '@/utils/headers.util';
import { cookies } from 'next/headers';

export async function GET(req: Request) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return new Response(JSON.stringify({ message: 'No access token' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const headers = new Headers(forwardHeaders(req));
  headers.set('Authorization', `Bearer ${accessToken}`);

  const res = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/validate`, {
    method: 'GET',
    headers,
    credentials: 'include',
  });

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
