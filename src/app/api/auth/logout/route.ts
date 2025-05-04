import { forwardHeaders } from '@/utils/headers.util';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const headers = forwardHeaders(req);

  try {
    const backendResponse = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/logout`, {
      method: 'POST',
      headers,
      credentials: 'include',
    });

    const result = await backendResponse.json();

    if (!backendResponse.ok) {
      return new Response(JSON.stringify({ message: result.message || 'Logout failed' }), {
        status: backendResponse.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const cookieStore = await cookies();

    cookieStore.delete('refreshToken');
    cookieStore.delete('accessToken');
    cookieStore.delete('deviceId');

    return new Response(JSON.stringify({ message: 'Logout successful' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Logout Route Error:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
