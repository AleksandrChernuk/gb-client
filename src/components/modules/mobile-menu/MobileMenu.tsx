'use client'

import { Separator } from '@radix-ui/react-dropdown-menu';
import Logo from '@/components/shared/Logo';
import MobileSupport from './MobileSupport';
import { SwitchTheme } from '@/components/shared/SwitchTheme';
import { CustomDarwer } from '@/components/shared/CustomDarwer';
import { Globe, Menu, X } from 'lucide-react';
import { DrawerClose } from '@/components/ui/drawer';
import MobileLanguageChanger from './MobileLanguageChanger';
import useToggleOpen from '@/hooks/useToggleOpen';
import MobileProfileLink from './MobileProfileLink';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { Suspense } from 'react';

export const MobileMenu = ({ isAuthHeader }: { isAuthHeader?: boolean }) => {
  const { t } = useTranslation(['common']);

  const { open, handleToggleOpen } = useToggleOpen();

  return (
    <div className='block tablet:hidden'>
      <CustomDarwer
        open={open}
        toggleOpen={handleToggleOpen}
        trigger={
          <Button variant={'default'} size={'icon'} className='p-2 rounded-md'>
            <Menu size={24} className='stroke-white' />
          </Button>
        }
      >
        <div className='sticky top-0 z-50 px-5 py-4  bg-white dark:bg-dark_mode_main1 border-b-[1px] border-gray_0 dark:border-black_2_for_text flex items-center justify-between'>
          <DrawerClose>
            <Logo />
          </DrawerClose>
          <DrawerClose asChild>
            <Button variant={'default'} size={'icon'} className='p-2 rounded-md'>
              <X size={24} className='stroke-white' />
            </Button>
          </DrawerClose>
        </div>

        <div className='flex flex-col w-full h-full p-0 overflow-auto'>
          <div className='flex flex-col gap-4 p-5'>
            {!isAuthHeader && <MobileProfileLink />}
            <MobileSupport />
          </div>
          <Separator className='h-[1px] bg-gray_0 dark:bg-black_2_for_text' />
          <div className='flex flex-col gap-4 p-5'>
            <Suspense>
              <MobileLanguageChanger />
            </Suspense>

            <div className='flex flex-row items-center justify-between'>
              <div className='flex flex-row items-center gap-2'>
                <Globe size={24} className='stroke-primary' />
                <p className='text-base font-medium text-black_2_for_text dark:text-grayy body_medium'>
                  {t('site_theme')}
                </p>
              </div>
              <SwitchTheme />
            </div>
          </div>
        </div>
      </CustomDarwer>
    </div>
  );
};
