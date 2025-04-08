'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { X } from 'lucide-react';
import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useTranslations } from 'next-intl';

type Props = {
  onClickTrigger: () => void;
  children: ReactNode;
  selectButton: ReactNode;
  price: number;
  passengerCount: number;
};

export default function MobileDetails({ children, selectButton, onClickTrigger, price, passengerCount }: Props) {
  const t = useTranslations('common');

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
        {/*   */}
        <SheetHeader className="justify-between">
          <SheetTitle className="sr-only">Edit profile</SheetTitle>
          <SheetDescription className="sr-only">
            Make changes to your profile here. Click save when youre done.
          </SheetDescription>
          <h3 className="text-base font-bold leading-6 tracking-normal text-green-300">{t('details')}</h3>

          <SheetClose asChild>
            <Button
              variant={'default'}
              className="flex items-center gap-1 p-1 text-base font-bold leading-6 tracking-normal bg-green-300 rounded-md"
            >
              <X color="#ffffff" />
            </Button>
          </SheetClose>
        </SheetHeader>

        <ScrollArea className="relative w-full px-5 mx-auto overflow-y-scroll grow bg-slate-50 dark:bg-slate-900 shadow-xs">
          {children}
        </ScrollArea>
        <SheetFooter className="flex flex-row justify-between gap-2 bg-white dark:bg-slate-800 ">
          <div className="mx-auto text-center">
            <div className="text-xs font-normal tracking-normal leading-[18px] text-[#6f8b90] dark:text-slate-50">
              {passengerCount} {t('placeholderPassenger')}
            </div>
            <div className="text-base font-normal leading-6 tracking-normal text-slate-700 dark:text-slate-200">
              {price} <span className="text-xs ml-[2px]">UAH</span>
            </div>
          </div>
          <div className="w-1/2">{selectButton}</div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
