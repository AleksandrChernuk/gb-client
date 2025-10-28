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
import CarrierLabel from '@/shared/ui/RouteCarrierLabel';

type Props = {
  onClickTrigger: () => void;
  children: ReactNode;
  detailsFooter: ReactNode;
  disabledTrigger?: boolean;
  carrierName: string;
};

export default function MobileDetails({
  children,
  detailsFooter,
  onClickTrigger,
  disabledTrigger,
  carrierName,
}: Props) {
  const t = useTranslations(MESSAGE_FILES.BUSES_PAGE);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          disabled={disabledTrigger}
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
          <CarrierLabel carrierName={carrierName} />
          <SheetClose asChild>
            <Button variant={'default'} size={'icon'} className="p-2 rounded-md">
              <X color="#ffffff" />
            </Button>
          </SheetClose>
        </SheetHeader>

        <div className="relative w-full px-5 mx-auto overflow-y-scroll shadow-xs grow bg-white dark:bg-slate-900">
          {children}
        </div>
        <SheetFooter className="flex justify-between gap-2 bg-white dark:bg-slate-800 ">{detailsFooter}</SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
