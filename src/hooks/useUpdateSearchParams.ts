'use client';

import { usePathname, useSearchParams } from 'next/navigation';

export function useUpdateSearchParams() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    const newUrl = `${pathname}?${params.toString()}`;
    window.history.replaceState(null, '', newUrl);
  };

  const removeParam = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    const newUrl = `${pathname}?${params.toString()}`;
    window.history.replaceState(null, '', newUrl);
  };

  const setManyParams = (entries: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(entries).forEach(([key, value]) => {
      params.set(key, value);
    });
    const newUrl = `${pathname}?${params.toString()}`;
    window.history.replaceState(null, '', newUrl);
  };

  return {
    setParam,
    removeParam,
    setManyParams,
  };
}
