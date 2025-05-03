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
          className="w-full py-[14px] px-6 tablet:py-4 gap-4 text-black border-black rounded-full text-base font-bold leading-6 tracking-normal dark:text-slate-50 dark:border-inherit max-h-[48px] tablet:max-h-[52px]"
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
