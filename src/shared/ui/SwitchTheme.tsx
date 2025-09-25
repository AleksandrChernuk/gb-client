'use client';

import { Skeleton } from '@/shared/ui/skeleton';
import { Switch } from '@/shared/ui/switch-theme';
import { useTheme } from 'next-themes';
import { useLayoutEffect, useState } from 'react';

const SwitchTheme = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    if (resolvedTheme) {
      setChecked(resolvedTheme === 'dark');
    }
    setLoading(false);
  }, [resolvedTheme]);

  const handleChecked = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    setChecked(resolvedTheme !== 'dark');
  };

  return loading ? (
    <Skeleton className="h-[32px] w-[56px] bg-green-50 dark:bg-slate-700 rounded-full" />
  ) : (
    <Switch checked={checked} onCheckedChange={handleChecked} />
  );
};

export default SwitchTheme;
