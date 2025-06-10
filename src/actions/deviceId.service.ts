'use server';

import { cookies } from 'next/headers';

import { v4 as uuidv4 } from 'uuid';

export const getDeviceId = async () => {
  const cookieStore = await cookies();
  const deviceId = cookieStore.get('deviceId')?.value;

  if (!deviceId) {
    const newDeviceId = uuidv4();

    cookieStore.set('deviceId', newDeviceId, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 365 * 24 * 60 * 60, // 1 год
    });

    return newDeviceId;
  }
  return deviceId;
};

export const deleteDeviceId = async () => {
  const cookieStore = await cookies();
  const deviceId = cookieStore.get('deviceId')?.value;

  if (!deviceId) {
    return null;
  }

  cookieStore.delete('deviceId');
};
