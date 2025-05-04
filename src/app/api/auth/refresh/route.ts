import { forwardHeaders } from '@/utils/headers.util';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const headers = forwardHeaders(req);

  try {
    const cookieStore = await cookies();
    const currentRefreshToken = cookieStore.get('refreshToken')?.value;

    if (!currentRefreshToken) {
      return new Response(JSON.stringify({ message: 'No refresh token' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const backendResponse = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/refresh`, {
      method: 'POST',
      headers,
      credentials: 'include',
    });

    const result = await backendResponse.json();

    if (!backendResponse.ok) {
      return new Response(JSON.stringify({ message: result.message || 'Verification failed' }), {
        status: backendResponse.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { message, accessToken, refreshToken } = result;

    if (refreshToken) {
      cookieStore.set('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        maxAge: 7 * 24 * 60 * 60, // 7 дней
      });
    }

    if (accessToken) {
      cookieStore.set('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        maxAge: 15 * 60, // 15 минут
      });
    }

    return new Response(
      JSON.stringify({
        message,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error('Refresh route error:', error);
    return new Response(JSON.stringify({ message: 'Refresh Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
