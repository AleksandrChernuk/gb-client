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
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet';
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
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <TripSearchInput name="voyagers" startIcon={<IconPass />} type="button" value={label} />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="sr-only" />
            <SheetDescription className="sr-only" />
            <SheetClose asChild>
              <Button
                variant="link"
                className="flex items-center gap-1 text-base font-bold text-slate-700 dark:text-slate-50"
              >
                <ChevronLeft size={24} className="stroke-slate-700 dark:stroke-slate-50" />
                {t('backBtn')}
              </Button>
            </SheetClose>
          </SheetHeader>
          <div className="relative px-5 overflow-y-scroll grow bg-slate-50 dark:bg-slate-900">
            <div className="my-5">
              <PassengersButton value={count} handleIcrement={increment} handleDecrement={decrement} />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="default" size="primary" className="w-full text-base font-bold rounded-full">
                {t('continue')}
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
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
