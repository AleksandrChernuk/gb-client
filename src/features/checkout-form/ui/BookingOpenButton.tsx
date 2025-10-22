'use client';

import IconSeat from '@/assets/icons/IconSeat';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Button } from '@/shared/ui/button';
import { Skeleton } from '@/shared/ui/skeleton';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

type TBookingOpenButton = {
  hasSeatMap?: boolean;
  error?: boolean;
  isHydrated?: boolean;
  selectedSeatsCount: number;
  passengersCount: number;
} & React.ComponentProps<typeof Button>;

export default function BookingOpenButton({
  hasSeatMap,
  error,
  isHydrated,
  selectedSeatsCount,
  passengersCount,
  ...buttonProps
}: TBookingOpenButton) {
  const t_page = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);

  return (
    <Button
      {...buttonProps}
      disabled={!hasSeatMap}
      variant="outline"
      type="button"
      aria-invalid={!!error}
      className="flex items-center justify-between w-full h-auto p-2 border rounded-lg bg-inherit border-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 dark:border-slate-700 dark:hover:border-slate-700 active:border-slate-700 dark:active:border-slate-900 shadow-sm disabled:opacity-100"
    >
      <div className="flex items-center gap-2 tablet:gap-4">
        <div className="[&_svg]:fill-[#6f8b90] w-[45px] h-[56px]">
          <IconSeat />
        </div>

        {isHydrated ? (
          <div className="text-xs tablet:text-base leading-6 tracking-normal text-black dark:text-slate-50 shrink min-w-0">
            {!hasSeatMap ? (
              <div className="flex flex-col items-start gap-1">
                <span>{t_page('free_seating')}</span>
                <span className="text-base leading-4 tracking-normal text-green-300">{t_page('seat_guaranteed')}</span>
              </div>
            ) : (
              <div className="flex flex-col items-start gap-1">
                <span className="text-green-300">{t_page('choose_place')}</span>
                <span
                  className={`text-sm ${error ? 'text-[#de2a1a]  dark:text-[#de2a1a]' : 'text-black dark:text-slate-50'}`}
                >
                  {`${t_page('selected_place')} ${selectedSeatsCount} ${t_page('selected_seats_status')} ${passengersCount} ${t_page('place')}`}
                </span>
              </div>
            )}
          </div>
        ) : (
          <Skeleton className="min-w-18 h-[24px]" />
        )}
      </div>
      <ChevronRight size={32} className="stroke-[#6f8b90] flex-shrink-0" />
    </Button>
  );
}
