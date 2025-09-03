import { cookies } from 'next/headers';

import { getJwtExpMs } from './decoderJwt.util';

import { ExchangeResponse, RefreshResponse, SigninSuccess, Verify2FAResponse } from '../types/auth.types';

// ============ Функция настройки куки ===========
export function cookieBase() {
  // const isProd = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true as const,
    secure: true,
    sameSite: 'lax' as const,
    path: '/',
  };
}

// ============ Функция для установки auth куки ===========
export async function setAuthCookies(data: SigninSuccess): Promise<void> {
  const cookieStore = await cookies();
  const base = cookieBase();
  const now = Date.now();

  const aexp = getJwtExpMs(data.accessToken);
  const rexp = getJwtExpMs(data.refreshToken);

  const accessMaxAge = aexp ? Math.max(1, Math.floor((aexp - now) / 1000)) : 15 * COOKIE_DURATION.MINUTE;

  const refreshMaxAge = rexp ? Math.max(1, Math.floor((rexp - now) / 1000)) : 30 * COOKIE_DURATION.DAY;

  cookieStore.set('accessToken', data.accessToken, {
    ...base,
    maxAge: accessMaxAge,
  });

  cookieStore.set('refreshToken', data.refreshToken, {
    ...base,
    maxAge: refreshMaxAge,
  });

  if (data.deviceId) {
    cookieStore.set('deviceId', data.deviceId, {
      ...base,
      maxAge: COOKIE_DURATION.YEAR,
    });
  }
}

// ========== Функция для установки куки специально для refresh ==========
export async function setRefreshCookies(data: RefreshResponse): Promise<void> {
  const cookieStore = await cookies();
  const base = cookieBase();
  const now = Date.now();

  const aexp = getJwtExpMs(data.accessToken);
  const rexp = getJwtExpMs(data.refreshToken);

  const accessMaxAge = aexp ? Math.max(1, Math.floor((aexp - now) / 1000)) : 15 * COOKIE_DURATION.MINUTE;

  const refreshMaxAge = rexp ? Math.max(1, Math.floor((rexp - now) / 1000)) : 30 * COOKIE_DURATION.DAY;

  cookieStore.set('accessToken', data.accessToken, {
    ...base,
    maxAge: accessMaxAge,
  });

  cookieStore.set('refreshToken', data.refreshToken, {
    ...base,
    maxAge: refreshMaxAge,
  });

  if (data.deviceId) {
    cookieStore.set('deviceId', data.deviceId, {
      ...base,
      maxAge: COOKIE_DURATION.YEAR,
    });
  }
}

// =========== Функция очистки куки access и refresh ===========
export async function clearAuthCookies(): Promise<void> {
  const base = cookieBase();
  const cookieStore = await cookies();

  cookieStore.set('accessToken', '', { ...base, maxAge: 0 });
  cookieStore.set('refreshToken', '', { ...base, maxAge: 0 });
}

// ============ Функция для полной очистки auth cookies (включая deviceId) ===========
export async function clearAllAuthCookies(): Promise<void> {
  const store = await cookies();
  const base = cookieBase();

  store.set('accessToken', '', { ...base, maxAge: 0 });
  store.set('refreshToken', '', { ...base, maxAge: 0 });
  store.set('deviceId', '', { ...base, maxAge: 0 });
}

// ========== Функция для установки cookies после OAuth exchange ==========
export async function setOAuthCookies(data: ExchangeResponse): Promise<void> {
  const cookieStore = await cookies();
  const base = cookieBase();
  const now = Date.now();

  await clearAuthCookies();

  const aexp = getJwtExpMs(data.accessToken);
  const rexp = getJwtExpMs(data.refreshToken);

  const accessMaxAge = aexp ? Math.max(1, Math.floor((aexp - now) / 1000)) : 15 * COOKIE_DURATION.MINUTE;

  const refreshMaxAge = rexp ? Math.max(1, Math.floor((rexp - now) / 1000)) : 30 * COOKIE_DURATION.DAY;

  cookieStore.set('accessToken', data.accessToken, {
    ...base,
    maxAge: accessMaxAge,
  });

  cookieStore.set('refreshToken', data.refreshToken, {
    ...base,
    maxAge: refreshMaxAge,
  });

  if (data.deviceId) {
    cookieStore.set('deviceId', data.deviceId, {
      ...base,
      maxAge: COOKIE_DURATION.YEAR,
    });
  }
}

// =========== Функция для установки cookies после 2FA верификации ============
export async function set2FACookies(data: Verify2FAResponse): Promise<void> {
  const cookieStore = await cookies();
  const base = cookieBase();
  const now = Date.now();

  await clearAuthCookies();

  if (data.accessToken) {
    const aexp = getJwtExpMs(data.accessToken);
    const accessMaxAge = aexp ? Math.max(1, Math.floor((aexp - now) / 1000)) : 15 * COOKIE_DURATION.MINUTE;

    cookieStore.set('accessToken', data.accessToken, {
      ...base,
      maxAge: accessMaxAge,
    });
  }

  if (data.refreshToken) {
    const rexp = getJwtExpMs(data.refreshToken);
    const refreshMaxAge = rexp ? Math.max(1, Math.floor((rexp - now) / 1000)) : 30 * COOKIE_DURATION.DAY;

    cookieStore.set('refreshToken', data.refreshToken, {
      ...base,
      maxAge: refreshMaxAge,
    });
  }

  if (data.deviceId) {
    cookieStore.set('deviceId', data.deviceId, {
      ...base,
      maxAge: COOKIE_DURATION.YEAR,
    });
  }
}

// ========== Функция для установки cookies после смены пароля ===========
export async function setChangePasswordCookies(data: {
  accessToken: string;
  refreshToken: string;
  deviceId?: string;
}): Promise<void> {
  const cookieStore = await cookies();
  const base = cookieBase();
  const now = Date.now();

  const aexp = getJwtExpMs(data.accessToken);
  const rexp = getJwtExpMs(data.refreshToken);

  const accessMaxAge = aexp ? Math.max(1, Math.floor((aexp - now) / 1000)) : 15 * COOKIE_DURATION.MINUTE;

  const refreshMaxAge = rexp ? Math.max(1, Math.floor((rexp - now) / 1000)) : 30 * COOKIE_DURATION.DAY;

  cookieStore.set('accessToken', data.accessToken, {
    ...base,
    maxAge: accessMaxAge,
  });

  cookieStore.set('refreshToken', data.refreshToken, {
    ...base,
    maxAge: refreshMaxAge,
  });

  if (data.deviceId) {
    cookieStore.set('deviceId', data.deviceId, {
      ...base,
      maxAge: COOKIE_DURATION.YEAR,
    });
  }
}

export const COOKIE_DURATION = {
  MINUTE: 60,
  HOUR: 60 * 60,
  DAY: 24 * 60 * 60,
  WEEK: 7 * 24 * 60 * 60,
  MONTH: 30 * 24 * 60 * 60,
  YEAR: 365 * 24 * 60 * 60,
};
