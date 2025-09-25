'use server';

import { cookies } from 'next/headers';

export const getPassengesrsCookies = async () => {
  try {
    const cookieStore = await cookies();
    const passengesr = cookieStore.get('_p');

    if (!passengesr) {
      throw new Error('passengesrs no found');
    }
    const { adult, children } = JSON.parse(passengesr.value);

    return { adult, children };
  } catch (error) {
    console.log(error);
  }
};
