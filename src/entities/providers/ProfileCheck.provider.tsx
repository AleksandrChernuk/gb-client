'use client';

import { useEffect, useRef } from 'react';

import { useLocale } from 'next-intl';
import { useUserStore } from '@/shared/store/useUser';
import { getProfileAndStore } from '@/shared/api/user.services.client';

type ValidateResp = { authenticated: boolean };

export default function ProfileCheckProvider() {
  const locale = useLocale();
  const ranRef = useRef(false); // защита от двойного useEffect в dev
  const clearUserStore = useUserStore((s) => s.clearUserStore);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    let aborted = false;

    const safeValidate = async (): Promise<ValidateResp> => {
      try {
        const res = await fetch('/api/auth/validate-auth', {
          credentials: 'include',
        });
        return await res.json();
      } catch {
        return { authenticated: false };
      }
    };

    const safeRefresh = async (): Promise<boolean> => {
      try {
        const res = await fetch('/api/auth/refresh', {
          method: 'POST',
          credentials: 'include',
        });
        return res.ok;
      } catch {
        return false;
      }
    };

    const run = async () => {
      try {
        // Первая проверка
        const firstCheck = await safeValidate();

        if (!firstCheck.authenticated) {
          // Попытка рефреша
          const refreshed = await safeRefresh();

          if (!refreshed) {
            if (!aborted) clearUserStore();
            return;
          }

          // Повторная проверка
          const secondCheck = await safeValidate();
          if (!secondCheck.authenticated) {
            if (!aborted) clearUserStore();
            return;
          }
        }

        // Если авторизация есть, а стор пуст - тянем профиль.
        const hasUserNow = !!useUserStore.getState().currentUser;
        if (!hasUserNow) {
          await getProfileAndStore(locale);
        }
      } catch (e) {
        console.error('ProfileCheckProvider run error:', e);
      }
    };

    void run();

    return () => {
      aborted = true;
    };
  }, [clearUserStore, locale]);

  return null;
}
