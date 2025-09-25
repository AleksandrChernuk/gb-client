'use client';

import { useSinginGoogle } from '@/features/signin-google/models/useSinginGoogle';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Button } from '@/shared/ui/button';
import { useTranslations } from 'next-intl';
import { FcGoogle } from 'react-icons/fc';

export default function AuthSocial() {
  const t = useTranslations(MESSAGE_FILES.COMMON);
  const { handleClick, isLoading } = useSinginGoogle();

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
