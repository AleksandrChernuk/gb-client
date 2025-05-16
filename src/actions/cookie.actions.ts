'use server';

import { cookies } from 'next/headers';

export async function setCookie({ name, value }: { name: string; value: string }) {
  const cookieStore = await cookies();

  cookieStore.set({
    name,
    value,
    maxAge: 3600,
    secure: true,
    sameSite: 'lax',
  });
}

export async function DeleteCookie(name: string) {
  const cookieStore = await cookies();

  cookieStore.delete(name);
}

export async function getCookies(data: string) {
  try {
    const cookieStore = await cookies();
    const cookieData = cookieStore.get(data);

    if (!cookieData) {
      throw new Error('cookie data not found');
    }
    const parsed = JSON.parse(cookieData.value);

    return parsed;
  } catch (error) {
    console.log(error);
  }
}
