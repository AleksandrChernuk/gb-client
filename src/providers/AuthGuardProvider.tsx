'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function AuthGuardProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAndRefresh = async () => {
      const res = await fetch('/api/auth/validate-auth', {
        credentials: 'include',
      });

      if (res.ok) {
        setReady(true);
        return;
      }

      const refresh = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      });

      if (refresh.ok) {
        setReady(true);
      } else {
        router.replace('/auth/signin');
      }
    };

    checkAndRefresh();
  }, [router]);

  if (!ready) return <div>Loading...</div>;

  return <>{children}</>;
}
