'use client';

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
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import IconSeat from '../icons/IconSeat';
import FloorSheet from '../../../entities/checkout/FloorSwitch';
import { useController, useFormContext, useWatch } from 'react-hook-form';
import { memo } from 'react';
import { useSelectedTickets } from '@/shared/store/useSelectedTickets';
import { seatsMaper } from '../helpers/seatMaper';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Button } from '@/shared/ui/button';
import { Skeleton } from '@/shared/ui/skeleton';
import { ScrollArea } from '@/shared/ui/scroll-area';
import SeatsList from '@/entities/checkout/SeatsList';

const Booking = memo(function Booking() {
  const selectedTicket = useSelectedTickets((state) => state.selectedTicket);
  const isHydrated = useSelectedTickets((state) => state.isHydrated);
  const t_page = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);
  const t_common = useTranslations(MESSAGE_FILES.COMMON);
  const { control } = useFormContext();

  const {
    field: { value: selectedSeats },
    fieldState: { error },
  } = useController({
    control,
    name: 'selectedSeats',
  });

  const passengers = useWatch({ control, name: 'passengers' });

  const seatMapWithStatus = seatsMaper({
    seatsMap: selectedTicket?.details?.seatsMap,
    freeSeats: selectedTicket?.details?.freeSeatsMap,
  });

  const selectedSeatsCount = Array.isArray(selectedSeats) ? selectedSeats.length : 0;
  const hasSelectedSeats = selectedSeatsCount > 0;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          disabled={!seatMapWithStatus.length}
          variant={'outline'}
          type="button"
          aria-invalid={Boolean(error)}
          className="flex items-center justify-between w-full h-auto p-2 border rounded-lg bg-inherit border-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 dark:border-slate-700 dark:hover:border-slate-700 active:border-slate-700 dark:active:border-slate-900"
        >
          <div className="flex items-center gap-2 tablet:gap-4">
            <div className="[&_svg]:fill-[#6f8b90] w-[45px] h-[56px]">
              <IconSeat />
            </div>

            {isHydrated ? (
              <div className="text-xs tablet:text-base font-medium leading-6 tracking-normal text-slate-700 dark:text-slate-50 shrink min-w-0">
                {!seatMapWithStatus.length ? (
                  <div className="flex flex-col items-start gap-1">
                    <span>{t_page('free_seating')}</span>
                    <span className="text-base font-medium leading-4 tracking-normal">{t_page('seat_guaranteed')}</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-start gap-1">
                    <span>{t_page('choose_place')}</span>
                    <span className={`text-sm ${!!error && 'text-[#de2a1a]'}`}>
                      {`${t_page('selected_place')} ${selectedSeatsCount} ${t_page('selected_seats_status')} ${passengers.length} ${t_page('place')}`}
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
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="sr-only">Booking</SheetTitle>
          <SheetDescription className="sr-only">Select your seats</SheetDescription>
          <SheetClose asChild>
            <Button
              type="button"
              variant={'link'}
              className="gap-1 text-slate-700 dark:text-slate-50 text-base font-bold leading-6 tracking-normal"
            >
              <ChevronLeft size={24} />
              {t_common('backBtn')}
            </Button>
          </SheetClose>
        </SheetHeader>
        <ScrollArea className="relative w-full px-2 mx-auto overflow-y-scroll grow bg-slate-50 dark:bg-slate-900 shadow-xs">
          <div className="flex flex-col gap-2">
            {seatMapWithStatus.length === 1 && <SeatsList helm={true} seatRows={seatMapWithStatus[0]} />}

            {seatMapWithStatus.length >= 2 && (
              <FloorSheet
                floor_first={<SeatsList helm={true} seatRows={seatMapWithStatus[0]} />}
                floor_second={<SeatsList seatRows={seatMapWithStatus[1]} />}
              />
            )}
          </div>
        </ScrollArea>

        <SheetFooter className="flex flex-row justify-between gap-2 bg-white dark:bg-slate-800">
          <div className="flex flex-col items-center justify-center w-1/2 gap-1">
            <div className="text-sm font-normal leading-4 tracking-normal text-slate-700 dark:text-slate-50">
              {hasSelectedSeats ? t_page('seats_selected') : t_page('no_seats')}
            </div>
            <div className="text-base font-bold leading-6 tracking-normal text-slate-700 dark:text-slate-50">
              {selectedSeatsCount}
            </div>
          </div>
          <div className="w-1/2">
            <SheetClose asChild>
              <Button
                disabled={!hasSelectedSeats}
                type="button"
                size={'small_primary'}
                className="w-full px-5 py-3 text-sm font-bold tracking-normal leading-[16.8px]"
                variant={'default'}
              >
                {t_page('confirm')}
              </Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
});

export default Booking;
