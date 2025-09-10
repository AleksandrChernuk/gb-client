'use client';

import { useEffect, useRef, useState } from 'react';
import { Container } from '@/components/shared/Container';
import AuthHeader from '@/components/modules/header/AuthHeader';
import { BusLoader } from '@/components/shared/BusLoader';
import { REDIRECT_PATHS } from '@/config/redirectPaths';
import { usePathname, useRouter } from 'next/navigation';
import { useUserStore } from '@/store/useUser';
import { useShallow } from 'zustand/react/shallow';

type ValidateResp = { authenticated: boolean };

export function AuthGuardProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const currentUser = useUserStore(useShallow((state) => state.currentUser));
  const router = useRouter();
  const pathname = usePathname();
  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    const getLocale = () => {
      const seg = (pathname || '/').split('/')[1];
      return ['en', 'uk', 'ru'].includes(seg) ? seg : 'en';
    };

    const checkAndRefresh = async () => {
      // 1 - тихая валидация
      const res = await fetch('/api/auth/validate-auth', {
        credentials: 'include',
      });

      const vr: ValidateResp = await res.json().catch(() => ({ authenticated: false }));

      if (vr.authenticated) {
        setReady(true);
        return;
      }

      // 2 - рефреш (если есть refresh+deviceId)
      const refresh = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      });

      if (!refresh.ok) {
        router.replace(`/${getLocale()}/${REDIRECT_PATHS.signin}`);
        return;
      }

      // 3 - повторная тихая проверка
      const revalidate = await fetch('/api/auth/validate-auth', {
        credentials: 'include',
      });
      const rr: ValidateResp = await revalidate.json().catch(() => ({ authenticated: false }));

      if (rr.authenticated) {
        setReady(true);
      } else {
        router.replace(`/${getLocale()}/${REDIRECT_PATHS.signin}`);
      }
    };

    checkAndRefresh();
  }, [router, pathname]);

  if (!ready || !currentUser)
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
