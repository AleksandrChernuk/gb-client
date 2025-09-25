'use client';

import { X } from 'lucide-react';
import { ReactNode } from 'react';

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
import RouteDetailsToggle from '@/entities/route/RouteDetailsToggle';
import { Button } from '@/shared/ui/button';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';

type Props = {
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function MobileDetailTripCard({ children, open, onOpenChange }: Props) {
  const t = useTranslations(MESSAGE_FILES.BUSES_PAGE);
  const tf = useTranslations(MESSAGE_FILES.FORM);

  return (
    <Sheet onOpenChange={onOpenChange} open={open}>
      <SheetTrigger asChild>
        <RouteDetailsToggle isOpen={open} toggleOpen={() => onOpenChange(!open)} />
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
          <SheetClose asChild>
            <Button variant={'outline'} size={'default'}>
              {tf('close')}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
