// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import { usePathname, useRouter } from 'next/navigation';
// import AuthHeader from '@/widgets/header/AuthHeader';
// import { Container } from '@/shared/ui/Container';
// import { BusLoader } from '@/shared/ui/BusLoader';

// type ValidateResp = { authenticated: boolean };

// export function AuthGuardProvider({ children }: { children: React.ReactNode }) {
//   const [ready, setReady] = useState(false);
//   const router = useRouter();
//   const pathname = usePathname();
//   const ranRef = useRef(false);

//   useEffect(() => {
//     if (ranRef.current) return;
//     ranRef.current = true;

//     const getLocale = () => {
//       const seg = (pathname || '/').split('/')[1];
//       if (['en', 'ru'].includes(seg)) return seg;
//       return 'uk';
//     };

//     const checkAndRefresh = async () => {
//       // 1 - тихая валидация
//       const res = await fetch('/api/auth/validate-auth', {
//         credentials: 'include',
//       });
//       const vr: ValidateResp = await res.json().catch(() => ({ authenticated: false }));

//       if (vr.authenticated) {
//         setReady(true);
//         return;
//       }

//       // 2 - рефреш (если есть refresh+deviceId)
//       const refresh = await fetch('/api/auth/refresh', {
//         method: 'POST',
//         credentials: 'include',
//       });

//       if (!refresh.ok) {
//         router.replace(`/${getLocale()}/signin`);
//         return;
//       }

//       // 3 - повторная тихая проверка
//       const revalidate = await fetch('/api/auth/validate-auth', {
//         credentials: 'include',
//       });
//       const rr: ValidateResp = await revalidate.json().catch(() => ({ authenticated: false }));

//       if (rr.authenticated) {
//         setReady(true);
//       } else {
//         router.replace(`/${getLocale()}/signin`);
//       }
//     };

//     checkAndRefresh();
//   }, [router, pathname]);

//   if (!ready)
//     return (
//       <div className="flex flex-col min-h-svh supports-[min-height:100dvh]:min-h-dvh">
//         <AuthHeader />
//         <main className="flex flex-1 items-center justify-center">
//           <Container size="xs" className="py-4">
//             <BusLoader />
//           </Container>
//         </main>
//       </div>
//     );

//   return <>{children}</>;
// }

'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AuthHeader from '@/widgets/header/AuthHeader';
import { Container } from '@/shared/ui/Container';
import { BusLoader } from '@/shared/ui/BusLoader';
import { useUserStore } from '@/shared/store/useUser';

type ValidateResp = { authenticated: boolean };

export function AuthGuardProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const user = useUserStore();
  const ranRef = useRef(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    let mounted = true;

    if (ranRef.current && user) {
      setReady(true);
      return;
    }

    ranRef.current = true;

    const getLocale = () => {
      const seg = (pathname || '/').split('/')[1];
      if (['en', 'ru'].includes(seg)) return seg;
      return 'uk';
    };

    const checkAndRefresh = async () => {
      if (!mounted) return;

      // 1️⃣ если юзер уже есть — готово
      if (user) {
        setReady(true);
        return;
      }

      // контроллер отмены
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        // 2️⃣ тихая валидация
        const res = await fetch('/api/auth/validate-auth', {
          credentials: 'include',
          signal: controller.signal,
        });
        const vr: ValidateResp = await res.json().catch(() => ({ authenticated: false }));

        if (vr.authenticated) {
          if (mounted) setReady(true);
          return;
        }

        // 3️⃣ рефреш токенов
        const refresh = await fetch('/api/auth/refresh', {
          method: 'POST',
          credentials: 'include',
          signal: controller.signal,
        });

        if (!refresh.ok) {
          router.replace(`/${getLocale()}/signin`);
          return;
        }

        // 4️⃣ повторная валидация
        const revalidate = await fetch('/api/auth/validate-auth', {
          credentials: 'include',
          signal: controller.signal,
        });
        const rr: ValidateResp = await revalidate.json().catch(() => ({ authenticated: false }));

        if (rr.authenticated) {
          if (mounted) setReady(true);
        } else {
          router.replace(`/${getLocale()}/signin`);
        }
      } catch (err) {
        console.log(err);
        if (mounted) router.replace(`/${getLocale()}/signin`);
      }
    };

    // Добавляем небольшую задержку, чтобы избежать дубли при быстрой навигации
    const timer = setTimeout(checkAndRefresh, 100);

    return () => {
      mounted = false;
      abortRef.current?.abort();
      clearTimeout(timer);
    };
  }, [pathname, router, user]);

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
