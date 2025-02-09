"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
 import { Skeleton } from "../ui/skeleton";
import { Switch } from "../ui/switch-theme";

export const SwitchTheme = () => {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const localtheme = localStorage.getItem('theme');

    if (localtheme && theme) {
      setTheme(localtheme);
      setChecked(localtheme === 'dark');
    } else if (theme) {
      setChecked(theme === 'dark');
    }
    setLoading(false);
  }, [theme, setTheme]);

  const handleChecked = () => {
    const newTheme = checked ? 'light' : 'dark';
    setTheme(newTheme);
    setChecked(!checked);
  };

  return loading ? (
    <Skeleton className='h-[32px] w-[56px] bg-light_primary dark:bg-black_2_for_text rounded-full' />
  ) : (
    <Switch checked={checked} onCheckedChange={handleChecked} />
  );
};
