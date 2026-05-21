// features/trip-search/ui/TripPassengers.tsx
'use client';

import { useCallback, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronLeft } from 'lucide-react';
import { useRouterSearch } from '@/shared/hooks/useRouterSearch';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { PassengersButton } from '@/features/route-search-form/ui/helpers/PassengersButton';
import { IconPass } from '@/assets/icons/IconPass';
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
import { Button } from '@/shared/ui/button';
import { TripSearchInput } from './TripSearchInput';

type Props = {
  variant: 'mobile' | 'desktop';
};

export function TripPassengers({ variant }: Props) {
  const [params, actions] = useRouterSearch();
  const [open, setOpen] = useState(false);
  const t = useTranslations(MESSAGE_FILES.COMMON);

  const count = params.voyagers;

  const label =
    count === 1
      ? `${count} ${t('placeholderPassenger')}`
      : count > 4
        ? `${count} ${t('placeholderPassengersGenitive')}`
        : `${count} ${t('placeholderPassengers')}`;

  const handleBlur = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
  }, []);

  const increment = () => actions.setPassenger(count + 1);
  const decrement = () => actions.setPassenger(count - 1);

  if (variant === 'mobile') {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <TripSearchInput name="voyagers" startIcon={<IconPass />} type="button" value={label} />
        </DrawerTrigger>
        <DrawerContent className="h-[92dvh] max-h-[92dvh] px-0 pb-0 rounded-t-[24px] overflow-hidden border-t shadow-2xl flex flex-col">
          <DrawerHeader className="text-left border-none">
            <DrawerTitle className="sr-only" />
            <DrawerDescription className="sr-only" />
          </DrawerHeader>
          <div className="relative px-5 overflow-y-scroll grow bg-slate-50 dark:bg-slate-900">
            <div className="my-5">
              <PassengersButton value={count} handleIcrement={increment} handleDecrement={decrement} />
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="default" size="primary" className="w-full text-base font-bold rounded-full mb-6">
                {t('continue')}
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <div className="relative" onBlur={handleBlur}>
      <TripSearchInput
        name="voyagers"
        startIcon={<IconPass />}
        type="button"
        value={label}
        onClick={() => setOpen((p) => !p)}
      />
      {open && (
        <div
          className="absolute right-0 z-50 p-4 mt-5 bg-white top-full rounded-2xl dark:bg-slate-800 dark:border dark:border-slate-900 animate-in fade-in zoom-in shadow-sm tablet:min-w-[397px]"
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <PassengersButton value={count} handleIcrement={increment} handleDecrement={decrement} />
        </div>
      )}
    </div>
  );
}
