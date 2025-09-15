'use client';

import { useEffect, useRef, useState } from 'react';
import { Container } from '@/components/shared/Container';
import AuthHeader from '@/components/modules/header/AuthHeader';
import { BusLoader } from '@/components/shared/BusLoader';
import { REDIRECT_PATHS } from '@/config/redirectPaths';
import { usePathname, useRouter } from 'next/navigation';
import { useUserStore } from '@/store/useUser';
import { logout } from '@/actions/auth.service';

type ValidateResp = { authenticated: boolean };

export function AuthGuardProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const ranRef = useRef(false);

  const currentUser = useUserStore((s) => s.currentUser);
  const clearUser = useUserStore((s) => s.clearUserStore);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    const getLocale = () => {
      const seg = (pathname || '/').split('/')[1];
      return ['en', 'uk', 'ru'].includes(seg) ? seg : 'en';
    };

    const logoutAndRedirect = async () => {
      try {
        await logout(); // чистим серверные куки (access/refresh/deviceId/и т.д.)
      } catch (e) {
        console.error('logout failed', e);
      }
      clearUser?.(); // чистим zustand локально
      router.replace(`/${getLocale()}/${REDIRECT_PATHS.signin}`);
    };

    const checkAndRefresh = async () => {
      // === КЕЙС #1: нет юзера в сторе — СРАЗУ разлогинить и редиректнуть ===
      if (!currentUser) {
        return logoutAndRedirect();
      }

      // 1 — проверяем наличие валидных токенов
      const res = await fetch('/api/auth/validate-auth', { credentials: 'include' });
      const vr: ValidateResp = await res.json().catch(() => ({ authenticated: false }));

      if (vr.authenticated) {
        // Всё ок: юзер есть в сторе и токены валидны
        setReady(true);
        return;
      }

      // 2 — пробуем refresh (вдруг токен просто протух)
      const refresh = await fetch('/api/auth/refresh', { method: 'POST', credentials: 'include' });

      if (!refresh.ok) {
        // === КЕЙС #2: токенов нет/невалидны, но юзер есть в сторе — очистить стор и разлогинить ===
        clearUser?.();
        return logoutAndRedirect();
      }

      // 3 — повторно валидируем
      const revalidate = await fetch('/api/auth/validate-auth', { credentials: 'include' });
      const rr: ValidateResp = await revalidate.json().catch(() => ({ authenticated: false }));

      if (rr.authenticated) {
        setReady(true);
      } else {
        // === КЕЙС #2 (повтор): токенов нет, но юзер был — чистим стор и разлогиниваем ===
        clearUser?.();
        logoutAndRedirect();
      }
    };

    checkAndRefresh();
    // Важно: не зависим от currentUser, чтобы эффект не перезапускался при его изменении
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, pathname, clearUser]);

  if (!ready)
    return (
      <div className="flex flex-col h-screen">
        <AuthHeader />
        <main className="flex flex-1 items-center justify-center">
          <Container size="xs" className="py-4">
            <BusLoader />
          </Container>
        </main>
      </div>
    );

  return <>{children}</>;
}
