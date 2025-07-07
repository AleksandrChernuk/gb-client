'use client';

import { IconGoogle } from '@/components/icons/IconGoogle';
import { Button } from '@/components/ui/button';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { useTranslations } from 'next-intl';

const AuthSocial = () => {
  const t = useTranslations(MESSAGE_FILES.COMMON);
  return (
    <form className="flex items-center w-full">
      <div className="flex items-center w-full gap-x-2">
        <Button
          variant={'outline'}
          type="button"
          size={'primery'}
          className="text-black border-black text-base font-bold leading-6 tracking-normal dark:text-slate-50 dark:border-inherit"
        >
          <div className="w-6 h-6">
            <IconGoogle />
          </div>
          {t('auth_google_btn')}
        </Button>
      </div>
    </form>
  );
};

export default AuthSocial;
