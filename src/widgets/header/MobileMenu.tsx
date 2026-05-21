'use client';

import { Globe, Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/ui/drawer';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Button } from '@/shared/ui/button';
import Logo from '@/entities/company/Logo';
import Support from '@/entities/company/Support';
import SelectLocale from '@/entities/common/SelectLocale';
import { ProfileLink } from '@/entities/profile/ProfileLink';
import SwitchTheme from '@/shared/ui/SwitchTheme';
import { Suspense } from 'react';

export const HeaderMobileMenu = ({ isAuthHeader }: { isAuthHeader?: boolean }) => {
  const t = useTranslations(MESSAGE_FILES.COMMON);

  return (
    <div className="block tablet:hidden">
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant="default"
            size="icon"
            className="p-2 rounded-xl bg-primary/10 hover:bg-primary/20 border-none shadow-none"
            aria-label="Open menu"
          >
            <Menu size={22} className="stroke-primary" />
          </Button>
        </DrawerTrigger>

        <DrawerContent className="px-0 pb-0 pt-0 rounded-t-[28px] border-t-0 overflow-hidden bg-white dark:bg-slate-800 shadow-2xl">
          <DrawerHeader className="sr-only">
            <DrawerTitle>Menu</DrawerTitle>
            <DrawerDescription>Navigation menu</DrawerDescription>
          </DrawerHeader>



          {/* Menu items */}
          <div className="px-4 py-4 space-y-1 overflow-y-auto max-h-[70dvh]">

            {/* Profile */}
            {!isAuthHeader && (
              <DrawerClose asChild>
                <div className="px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                  <ProfileLink variant="mobile" />
                </div>
              </DrawerClose>
            )}

            {/* Support */}
            <div className="px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <Support variant="mobile" />
            </div>

            {/* Divider */}
            <div className="h-px bg-slate-100 dark:bg-slate-800 my-2" />

            {/* Language */}
            <div className="px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <Suspense>
                <SelectLocale variant="mobile" />
              </Suspense>
            </div>

            {/* Theme toggle */}
            <div className="flex items-center justify-between px-3 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <div className="flex items-center gap-2">
                <Globe size={24} className="stroke-primary shrink-0" />
                <p className="text-slate-700 dark:text-slate-50 text-base font-medium leading-6">
                  {t('site_theme')}
                </p>
              </div>
              <SwitchTheme />
            </div>
          </div>

          {/* Safe area bottom spacer */}
          <div className="pb-8 bg-white dark:bg-slate-800" />
        </DrawerContent>
      </Drawer>
    </div>
  );
};
