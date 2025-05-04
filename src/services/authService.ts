import { signinResponseSchema } from '@/schemas/authResponse.schema';
import { TypeSignin, TypeSignup, TypeVerifyCode } from '../types/authRequest.type';

import { deleteDeviceId, getDeviceId } from './deviceId.service';

export async function signup(data: TypeSignup, locale: string) {
  try {
    const response = await fetch(`/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': locale,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Signup failed');
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.log('Signup error:', error);
    throw error;
  }
}

export async function verifyEmail(data: TypeVerifyCode) {
  const deviceId = await getDeviceId();

  try {
    const response = await fetch(`/api/auth/verify-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Device-Id': deviceId,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Verify failed');
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error('Verify email error:', error);
    throw error;
  }
}

export async function signin(data: TypeSignin, locale: string) {
  const deviceId = await getDeviceId();

  try {
    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Device-Id': deviceId,
        'Accept-Language': locale,
      },
      body: JSON.stringify(data),
    });

    // TODO: написать логику при twoFA = true

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Signin failed');
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error('Signin error:', error);
    throw error;
  }
}

export async function refresh() {
  const deviceId = await getDeviceId();

  if (!deviceId) {
    await logout();
  }

  try {
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'X-Device-Id': deviceId,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Refresh failed');
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error('Error trying to refresh token:', error);
    return null;
  }
}

export async function logout() {
  const deviceId = await getDeviceId();

  const response = await fetch(`/api/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Device-Id': deviceId,
    },
    credentials: 'include',
  });

  const result = await response.json();

  if (!result) {
    throw new Error('Logout failed!');
  }

  await deleteDeviceId();

  return true;
}

export function googleSignin(locale: string) {
  window.location.href = `/api/auth/google?locale=${locale}`;
}

export async function verify2FA(data: TypeVerifyCode) {
  try {
    const response = await fetch(`/api/auth/verify-2fa`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Verify failed');
    }

    const result = await response.json();
    const parsedResult = signinResponseSchema.parse(result);

    return parsedResult;
  } catch (error) {
    console.error('Verify 2FA error:', error);
    throw error;
  }
}

export async function getCurrentUser() {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    // TODO: написать логику при twoFA = true

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Signin failed');
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error('Signin error:', error);
    throw error;
  }
}
