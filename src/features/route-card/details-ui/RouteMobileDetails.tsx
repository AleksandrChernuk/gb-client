'use client';

import { X } from 'lucide-react';
import { ReactNode } from 'react';
import { Button } from '@/shared/ui/button';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/ui/drawer';
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
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          disabled={disabledTrigger}
          variant={'link'}
          className="items-center justify-center p-2 text-xs font-bold underline"
          onClick={onClickTrigger}
        >
          {t('details')}
        </Button>
      </DrawerTrigger>

      <DrawerContent className="px-0 pb-0 pt-0 rounded-t-[28px] border-t-0 overflow-hidden bg-white dark:bg-slate-900 shadow-2xl">
        <DrawerHeader className="flex flex-row items-center justify-between px-4 py-3 space-y-0">
          <DrawerTitle className="sr-only">{t('details')}</DrawerTitle>
          <DrawerDescription className="sr-only">{carrierName}</DrawerDescription>
          <CarrierLabel carrierName={carrierName} />
          <DrawerClose asChild>
            <Button variant={'default'} size={'icon'} className="p-2 rounded-md">
              <X color="#ffffff" />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <div className="relative w-full px-5 mx-auto overflow-y-auto shadow-xs grow bg-white dark:bg-slate-900 max-h-[70dvh]">
          {children}
        </div>

        <DrawerFooter className="flex flex-row justify-between gap-2 bg-white dark:bg-slate-800 pb-8">
          {detailsFooter}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
