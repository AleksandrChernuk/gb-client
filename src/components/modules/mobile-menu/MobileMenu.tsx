'use client'

import { Separator } from '@radix-ui/react-dropdown-menu'
import Logo from '@/components/shared/Logo'
import MobileSupport from './MobileSupport'
import { SwitchTheme } from '@/components/shared/SwitchTheme'
import { Globe, Menu, X } from 'lucide-react'
import MobileLanguageChanger from './MobileLanguageChanger'
import MobileProfileLink from './MobileProfileLink'
import { Button } from '@/components/ui/button'
import { Suspense } from 'react'
import { useTranslations } from 'next-intl'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ScrollArea } from '@radix-ui/react-scroll-area'

export const MobileMenu = ({ isAuthHeader }: { isAuthHeader?: boolean }) => {
  const t = useTranslations('common')

  return (
    <div className='block tablet:hidden'>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={'default'} size={'icon'} className='p-2 rounded-md'>
            <Menu size={24} className='stroke-white' />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className='justify-between px-4 py-3'>
            <SheetTitle className='sr-only'>Edit profile</SheetTitle>
            <SheetDescription className='sr-only'>
              Make changes to your profile here. Click save when youre done.
            </SheetDescription>

            <SheetClose>
              <Logo />
            </SheetClose>
            <SheetClose asChild>
              <Button variant={'default'} size={'icon'} className='p-2 rounded-md'>
                <X size={24} className='stroke-white' />
              </Button>
            </SheetClose>
          </SheetHeader>
          <ScrollArea className='relative  mx-auto overflow-y-scroll grow bg-grayy dark:bg-dark_bg shadow-2xs  w-full'>
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
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  )
}
