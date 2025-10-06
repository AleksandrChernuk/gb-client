'use client';

import { googleSignin } from '@/shared/api/auth.service';
import { useLocale } from 'next-intl';
import { useState } from 'react';

export const useSinginGoogle = () => {
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      googleSignin(locale);
    } catch (e) {
      console.log(e);
    }
  };
  return { handleClick, isLoading, setIsLoading };
};
