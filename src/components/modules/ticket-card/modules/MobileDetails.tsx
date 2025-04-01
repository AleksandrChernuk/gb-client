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
          <h3 className="font-medium h5 text-primary_1">{t('details')}</h3>

          <SheetClose asChild>
            <Button variant={'default'} className="flex items-center gap-1 p-1 rounded-md h5 bg-primary_1">
              <X color="#ffffff" />
            </Button>
          </SheetClose>
        </SheetHeader>

        <ScrollArea className="relative w-full px-5 mx-auto overflow-y-scroll grow bg-grayy dark:bg-dark_bg shadow-2xs">
          {children}
        </ScrollArea>
        <SheetFooter className="flex flex-row justify-between gap-2 bg-white dark:bg-dark_main ">
          <div className="mx-auto text-center">
            <div className="small_text text-gray_2_for_body dark:text-grayy">
              {passengerCount} {t('placeholderPassenger')}
            </div>
            <div className="main_text_body text-black.2.for.text dark:text-gray_1">
              {price} <span className="text-xs ml-[2px]">UAH</span>
            </div>
          </div>
          <div className="w-1/2">{selectButton}</div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
