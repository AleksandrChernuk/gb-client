'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Container } from '@/components/shared/Container';
import AuthHeader from '@/components/modules/header/AuthHeader';
import { BusLoader } from '@/components/shared/BusLoader';
import { REDIRECT_PATHS } from '@/config/redirectPaths';
import { useRouter } from '@/i18n/routing';

type ValidateResp = { authenticated: boolean };

export function AuthGuardProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const ranRef = useRef(false); // защита от двойного useEffect в dev

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
        router.replace(`/${REDIRECT_PATHS.signin}`);
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
