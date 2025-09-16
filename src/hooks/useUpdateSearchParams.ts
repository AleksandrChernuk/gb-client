'use client';

import { usePathname } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/i18n/routing';

export function useUpdateSearchParams() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`${pathname}?${params.toString()}`);
  };

  const removeParam = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    router.push(`${pathname}?${params.toString()}`);
  };

  const setManyParams = (entries: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(entries).forEach(([key, value]) => params.set(key, value));
    router.push(`${pathname}?${params.toString()}`);
  };

  return {
    setParam,
    removeParam,
    setManyParams,
  };
}
