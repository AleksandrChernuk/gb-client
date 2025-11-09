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
import { BookingOpenButton, FloorSwitch } from '@/features/checkout-form';
import { memo } from 'react';
import { useSelectedTickets } from '@/shared/store/useSelectedTickets';
import { useShallow } from 'zustand/react/shallow';
import { TypeSeatsMap } from '@/shared/types/seat.interface';

function isSeatsMapArray(seatsMap: string | TypeSeatsMap[] | null | undefined): seatsMap is TypeSeatsMap[] {
  return Array.isArray(seatsMap);
}

const Booking = memo(function Booking() {
  const { selectedTicket, isHydrated } = useSelectedTickets(
    useShallow((state) => ({
      selectedTicket: state.selectedTicket?.route,
      isHydrated: state.isHydrated,
    })),
  );

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
  console.log(selectedTicket?.details?.seatsMap);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <BookingOpenButton
          passengersCount={passengersCount}
          hasSeatMap={
            !hasSelectedSeats ||
            !isSeatsMapArray(selectedTicket?.details?.seatsMap) ||
            selectedTicket?.details?.seatsMap.length === 0
          }
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
            {selectedTicket?.details &&
              isSeatsMapArray(selectedTicket?.details?.seatsMap) &&
              selectedTicket?.details?.seatsMap.length === 1 && (
                <SeatsList helm={true} seatRows={selectedTicket?.details?.seatsMap[0]} />
              )}

            {selectedTicket?.details &&
              isSeatsMapArray(selectedTicket?.details?.seatsMap) &&
              selectedTicket?.details?.seatsMap.length >= 2 && (
                <FloorSwitch
                  floor_first={<SeatsList helm={true} seatRows={selectedTicket?.details?.seatsMap[0]} />}
                  floor_second={<SeatsList seatRows={selectedTicket?.details?.seatsMap[1]} />}
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
