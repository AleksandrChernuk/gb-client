'use client';

import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { CurrentUser } from '@/shared/types/auth.types';
import { useRouter } from '@/shared/i18n/routing';
import { REDIRECT_PATHS } from '@/shared/configs/redirectPaths';
import { useUserStore } from '@/shared/store/useUser';
import { Container } from '@/shared/ui/Container';
import { BusLoader } from '@/shared/ui/BusLoader';

type ValidateResp = { authenticated: boolean };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isCurrentUser(v: any): v is CurrentUser {
  return (
    !!v &&
    typeof v.id === 'string' &&
    typeof v.userName === 'string' &&
    typeof v.email === 'string' &&
    typeof v.twoFA === 'boolean' &&
    typeof v.method === 'string'
  );
}

export default function CallbackPage() {
  const router = useRouter();
  const params = useSearchParams();
  const locale = useLocale();

  useEffect(() => {
    const run = async () => {
      const status = params?.get('status');
      const code = params?.get('code');

      if (status !== 'success') {
        router.replace(locale === 'uk' ? `/${REDIRECT_PATHS.signin}` : `/${locale}/${REDIRECT_PATHS.signin}`);
        return;
      }

      if (code) {
        const ex = await fetch(`/api/auth/oauth-exchange?code=${encodeURIComponent(code)}`, { credentials: 'include' });

        if (!ex.ok) {
          router.replace(locale === 'uk' ? `/${REDIRECT_PATHS.signin}` : `/${locale}/${REDIRECT_PATHS.signin}`);
          return;
        }

        // ожидаем { message?: string; currentUser?: CurrentUser }
        const raw: unknown = await ex.json();

        // достаём currentUser
        const cu =
          raw && typeof raw === 'object' && 'currentUser' in raw
            ? (raw as { currentUser?: unknown }).currentUser
            : undefined;

        if (isCurrentUser(cu)) {
          useUserStore.getState().setUserStore(cu);
        }
      }

      // тихая проверка авторизации
      const v = await fetch('/api/auth/validate-auth', {
        credentials: 'include',
      });
      const data: ValidateResp = await v.json().catch(() => ({ authenticated: false }));
      if (data.authenticated) {
        router.replace(locale === 'uk' ? `/${REDIRECT_PATHS.profile}` : `/${locale}/${REDIRECT_PATHS.profile}`);
        return;
      }

      // мягкий рефреш
      const r = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      });
      if (r.ok) {
        const v2 = await fetch('/api/auth/validate-auth', {
          credentials: 'include',
        });
        const d2: ValidateResp = await v2.json().catch(() => ({ authenticated: false }));
        if (d2.authenticated) {
          router.replace(`/${REDIRECT_PATHS.profile}`);
          return;
        }
      }
      router.replace(locale === 'uk' ? `/${REDIRECT_PATHS.signin}` : `/${locale}/${REDIRECT_PATHS.signin}`);
    };

    run();
  }, [locale, params, router]);

  return (
    <div className="flex flex-1 items-center justify-center">
      <Container size="xs" className="py-4">
        <BusLoader />
      </Container>
    </div>
  );
}
