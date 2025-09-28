'use client';

import { logout } from '@/shared/api/auth.service';
import { useRouter } from '@/shared/i18n/routing';
import { useUserStore } from '@/shared/store/useUser';
import { useEffect } from 'react';

export const ConfirmDeleteProfileAction = () => {
  const router = useRouter();
  const { clearUserStore } = useUserStore();

  useEffect(() => {
    const cleanupAndRedirect = async () => {
      clearUserStore();
      await logout();

      const timer = setTimeout(() => {
        router.push(`/`);
      }, 10000);

      return () => clearTimeout(timer);
    };

    cleanupAndRedirect();
  }, [clearUserStore, router]);

  return null;
};
