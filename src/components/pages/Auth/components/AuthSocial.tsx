'use client';

import { IconGoogle } from '@/components/icons/IconGoogle';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

const AuthSocial = () => {
  const { t } = useTranslation(['common']);
  return (
    <form className='flex items-center w-full'>
      <div className='flex items-center w-full gap-x-2'>
        <Button
          variant={'outline'}
          type='button'
          className='w-full py-[14px] px-6 tablet:py-4 gap-4 text-black border-black rounded-full h5 dark:text-grayy dark:border-inherit max-h-[48px] tablet:max-h-[52px]'
        >
          <div className='w-6 h-6'>
            <IconGoogle />
          </div>
          {t('auth_google_btn')}
        </Button>
      </div>
    </form>
  );
};

export default AuthSocial;
