'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/shared/Container';
import { Loader } from 'lucide-react';

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
      <div className="flex flex-col h-svh items-center justify-center">
        <main>
          <section className="w-full">
            <Container size="xs" className="w-full">
              <Loader className="stroke-green-300 animate-spin" size={64} />
            </Container>
          </section>
        </main>
      </div>
    );

  return <>{children}</>;
}
