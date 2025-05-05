'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/shared/Container';
import { Loader } from 'lucide-react';
import AuthHeader from '@/components/modules/header/AuthHeader';

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
        router.replace('/signin');
      }
    };

    checkAndRefresh();
  }, [router]);

  if (!ready)
    return (
      <div className="flex flex-col h-screen">
        <AuthHeader />
        <main className="flex flex-1 items-center justify-center">
          <Container size="xs" className="py-4">
            <Loader className="stroke-green-300 animate-spin" size={64} />
          </Container>
        </main>
      </div>
    );

  return <>{children}</>;
}
