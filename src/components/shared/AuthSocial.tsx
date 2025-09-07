'use client';

import { googleSignin } from '@/actions/auth.service';
import { Button } from '@/components/ui/button';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

export default function AuthSocial() {
  const t = useTranslations(MESSAGE_FILES.COMMON);
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await googleSignin(locale);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center w-full">
      <Button
        variant="outline"
        type="button"
        size="primary"
        className="text-black border-black text-base font-bold leading-6 tracking-normal dark:text-slate-50 dark:border-inherit"
        onClick={handleClick}
        disabled={isLoading}
        aria-busy={isLoading}
      >
        <FcGoogle className={`mr-2 h-6 w-6 ${isLoading ? 'animate-spin' : ''}`} />
        {t('auth_google_btn')}
      </Button>
    </div>
  );
}
