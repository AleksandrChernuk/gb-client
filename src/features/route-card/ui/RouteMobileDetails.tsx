'use client';

import { ScrollArea } from '@/shared/ui/scroll-area';
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
  selectButton: ReactNode;
  price: number;
  passengerCount: number;
};

export default function MobileDetails({ children, selectButton, onClickTrigger, price, passengerCount }: Props) {
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
      <SheetContent>
        <SheetHeader className="justify-between">
          <SheetTitle className="sr-only"></SheetTitle>
          <SheetDescription className="sr-only"></SheetDescription>
          <h3 className="text-base font-bold leading-6 tracking-normal text-green-300">{t('details')}</h3>
          <SheetClose asChild>
            <Button variant={'default'} size={'icon'} className="p-2 rounded-md">
              <X color="#ffffff" />
            </Button>
          </SheetClose>
        </SheetHeader>

        <ScrollArea className="relative w-full px-5 mx-auto overflow-y-scroll shadow-xs grow bg-slate-50 dark:bg-slate-900">
          {children}
        </ScrollArea>
        <SheetFooter className="flex justify-between gap-2 bg-white dark:bg-slate-800 ">
          <div className="mx-auto text-center">
            <div className="text-xs font-normal tracking-normal leading-[18px] text-[#6f8b90] dark:text-slate-50">
              {passengerCount} {t('placeholderPassenger')}
            </div>
            <div className="text-base font-normal leading-6 tracking-normal text-slate-700 dark:text-slate-200">
              {price ?? 0} <span className="text-xs ml-[2px]">UAH</span>
            </div>
          </div>
          <div className="w-1/2">{selectButton}</div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
