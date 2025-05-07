import { forwardHeaders } from '@/utils/headers.util';

export async function POST(req: Request) {
  const headers = forwardHeaders(req);

  try {
    const data = await req.json();

    const backendResponse = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/signup`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    const result = await backendResponse.json();

    if (!backendResponse.ok) {
      return new Response(JSON.stringify({ message: result.message || 'Signup failed' }), {
        status: backendResponse.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Signup route error:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
