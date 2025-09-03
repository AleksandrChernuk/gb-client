'use client';

import { googleSignin } from '@/actions/auth.service';
import { Button } from '@/components/ui/button';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { FcGoogle } from 'react-icons/fc';

const AuthSocial = () => {
  const [isPending, startTransition] = useTransition();
  const t = useTranslations(MESSAGE_FILES.COMMON);
  const locale = useLocale();

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    startTransition(() => {
      googleSignin(locale);
    });
  };

  return (
    <form className="flex items-center w-full">
      <div className="flex items-center w-full gap-x-2">
        <Button
          variant={'outline'}
          type="button"
          size={'primary'}
          className="text-black border-black text-base font-bold leading-6 tracking-normal dark:text-slate-50 dark:border-inherit"
          onClick={handleSubmit}
        >
          <FcGoogle className={`mr-2 h-6 w-6 ${isPending && 'animate-spin'}`} />
          {t('auth_google_btn')}
        </Button>
      </div>
    </form>
  );
};

export default AuthSocial;
