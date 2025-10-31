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
import { ChevronLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useController, useFormContext, useWatch } from 'react-hook-form';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Button } from '@/shared/ui/button';
import { ScrollArea } from '@/shared/ui/scroll-area';
import SeatsList from '@/features/checkout-form/ui/SeatsList';
import { BookingOpenButton, FloorSwitch, useSeatMap } from '@/features/checkout-form';
import { memo } from 'react';

const Booking = memo(function Booking() {
  const { hasSeatMap, seatMapWithStatus, isHydrated } = useSeatMap();
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

  const selectedSeatsCount = Array.isArray(selectedSeats) ? selectedSeats.length : 0;
  const hasSelectedSeats = selectedSeatsCount > 0;
  const passengersCount = passengers?.length ?? 0;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <BookingOpenButton
          passengersCount={passengersCount}
          hasSeatMap={hasSeatMap}
          isHydrated={isHydrated}
          error={!!error}
          selectedSeatsCount={selectedSeatsCount}
        />
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle className="sr-only">Booking</SheetTitle>
          <SheetDescription className="sr-only">Select your seats</SheetDescription>
          <SheetClose asChild>
            <Button
              type="button"
              variant="link"
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
              <FloorSwitch
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
                size="small_primary"
                className="w-full px-5 py-3 text-sm font-bold tracking-normal leading-[16.8px]"
                variant="default"
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
