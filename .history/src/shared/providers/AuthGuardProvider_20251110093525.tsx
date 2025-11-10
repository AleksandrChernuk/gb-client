'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AuthHeader from '@/widgets/header/AuthHeader';
import { Container } from '@/shared/ui/Container';
import { BusLoader } from '@/shared/ui/BusLoader';

type ValidateResp = { authenticated: boolean };

export function AuthGuardProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    const getLocale = () => {
      const seg = (pathname || '/').split('/')[1];
      if (['en', 'ru'].includes(seg)) return seg;
      return 'uk';
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
        router.replace(`/${getLocale()}/signin`);
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
        router.replace(`/${getLocale()}/signin`);
      }
    };

    checkAndRefresh();
  }, [router, pathname]);

  if (!ready)
    return (
      <div className="flex flex-col min-h-svh supports-[min-height:100dvh]:min-h-dvh">
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
