'use client';

import { X } from 'lucide-react';
import { ReactNode } from 'react';
import { Button } from '@/shared/ui/button';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';

type Props = {
  onClickTrigger: () => void;
  children: ReactNode;
  detailsFooter: ReactNode;
};

export default function MobileDetails({ children, detailsFooter, onClickTrigger }: Props) {
  const t = useTranslations(MESSAGE_FILES.BUSES_PAGE);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant={'link'}
          className="items-center justify-center p-2 text-xs font-bold underline"
          onClick={onClickTrigger}
        >
          {t('details')}
        </Button>
      </SheetTrigger>
      <SheetContent className="h-full">
        <SheetHeader className="justify-between">
          <SheetTitle className="sr-only"></SheetTitle>
          <SheetDescription className="sr-only"></SheetDescription>
          <h3 className="text-base font-medium leading-6 tracking-normal text-green-200">{t('details')}</h3>
          <SheetClose asChild>
            <Button variant={'default'} size={'icon'} className="p-2 rounded-md">
              <X color="#ffffff" />
            </Button>
          </SheetClose>
        </SheetHeader>

        <div className="relative w-full px-5 mx-auto overflow-y-scroll shadow-xs grow bg-slate-50 dark:bg-slate-900">
          {children}
        </div>
        <SheetFooter className="flex justify-between gap-2 bg-white dark:bg-slate-800 ">{detailsFooter}</SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
