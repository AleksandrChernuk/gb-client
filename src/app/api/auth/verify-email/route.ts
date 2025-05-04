import { forwardHeaders } from '@/utils/headers.util';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const headers = forwardHeaders(req);

  try {
    const data = await req.json();

    const backendResponse = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/verify-email`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
      credentials: 'include',
    });

    const result = await backendResponse.json();

    if (!backendResponse.ok) {
      return new Response(JSON.stringify({ message: result.message || 'Verification failed' }), {
        status: backendResponse.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { message, accessToken, refreshToken, currentUser } = result;

    const cookieStore = await cookies();

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
        currentUser,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error('Verify email route error:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
