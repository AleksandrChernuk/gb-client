'use client';

import { Separator } from '@radix-ui/react-dropdown-menu';
import Logo from '@/components/shared/Logo';
import { SwitchTheme } from '@/components/shared/SwitchTheme';
import { Globe, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Suspense } from 'react';
import { useTranslations } from 'next-intl';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import SelectLocale from '@/components/shared/LanguageChanger';
import { ProfileLink } from '@/components/shared/ProfileLink';
import { Support } from '@/components/shared/Support';
import { MESSAGE_FILES } from '@/constans/message.file.constans';

export const MobileMenu = ({ isAuthHeader }: { isAuthHeader?: boolean }) => {
  const t = useTranslations(MESSAGE_FILES.COMMON);

  return (
    <div className="block tablet:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={'default'} size={'icon'} className="p-2 rounded-md">
            <Menu size={24} className="stroke-white" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="justify-between">
            <SheetTitle className="sr-only"></SheetTitle>
            <SheetDescription className="sr-only"></SheetDescription>
            <SheetClose>
              <Logo />
            </SheetClose>
            <SheetClose asChild>
              <Button variant={'default'} size={'icon'} className="p-2 rounded-md">
                <X size={24} className="stroke-white" />
              </Button>
            </SheetClose>
          </SheetHeader>
          <ScrollArea className="relative w-full mx-auto overflow-y-scroll shadow-xs grow bg-slate-50 dark:bg-slate-900 ">
            <div className="flex flex-col gap-2 p-5">
              {!isAuthHeader && <ProfileLink variant="mobile" />}
              <Support variant="mobile" />
            </div>
            <Separator className="h-[1px] bg-[#e6e6e6] dark:bg-slate-700 my-2" />
            <div className="flex flex-col gap-2 p-5">
              <Suspense>
                <SelectLocale variant="mobile" />
              </Suspense>

              <div className="flex flex-row items-center justify-between py-2">
                <div className="flex flex-row items-center gap-2">
                  <Globe size={24} className="stroke-primary" />
                  <p className="text-slate-700 dark:text-slate-50 text-base font-medium tracking-normal leading-[24px]">
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
  );
};
