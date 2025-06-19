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
} from '@/components/ui/sheet';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCurrentTicket } from '@/store/useCurrentTicket';
import { useTranslations } from 'next-intl';
import { Skeleton } from '@/components/ui/skeleton';
import IconSeat from '../icons/IconSeat';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import FloorSheet from '../components/FloorSwitch';
import { useController, useFormContext, useWatch } from 'react-hook-form';
import { memo, useMemo } from 'react';
import { TypeSeatsMap } from '@/types/seat.interface';
import SeatsList from '../shared/SeatsList';

const Booking = memo(function Booking() {
  const selectedTicket = useCurrentTicket((state) => state.selectedTicket);
  const isHydrated = useCurrentTicket((state) => state.isHydrated);
  const t_page = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);
  const t_common = useTranslations(MESSAGE_FILES.COMMON);
  const { control } = useFormContext();

  const {
    field: { value: selectedSeats },
    fieldState: { error },
  } = useController({
    control,
    name: 'selected_seats',
  });

  const passengers = useWatch({ control, name: 'passengers' });
  console.log('selectedTicket?.details?.free_seats_map', selectedTicket?.details?.seats_map);
  console.log('selectedTicket?.details?.free_seats_map', selectedTicket?.details?.free_seats_map);

  const seatMapWithStatus: TypeSeatsMap[] = useMemo(() => {
    const seatsMap = selectedTicket?.details?.seats_map;
    const freeSeats = selectedTicket?.details?.free_seats_map;

    if (!Array.isArray(seatsMap) || !Array.isArray(freeSeats)) return [];

    return seatsMap.map((floor) => ({
      ...floor,
      seats: floor.seats.map((row) =>
        row.map((seat) => {
          const isFree = freeSeats.some(
            (free) => (seat.id && seat.id === free.seat_id) || (seat.number && seat.number === free.seat_number),
          );

          return {
            ...seat,
            status: isFree ? 'FREE' : 'BUSY',
          };
        }),
      ),
    }));
  }, [selectedTicket]);

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            disabled={!selectedTicket?.details?.seats_map}
            variant={'outline'}
            type="button"
            aria-invalid={Boolean(error)}
            className=" flex items-center justify-between w-full h-auto p-3 border rounded-lg bg-inherit border-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 dark:border-slate-700 dark:hover:border-slate-700 active:border-slate-700 dark:active:border-slate-900 text-ellipsis"
          >
            <div className="flex items-center gap-2 tablet:gap-4">
              <div className="[&_svg]:fill-[#6f8b90] w-[45px] h-[56px]">
                <IconSeat />
              </div>

              {isHydrated ? (
                <div className="text-xs tablet:text-base font-medium leading-6 tracking-normal text-slate-700 dark:text-slate-50 shrink-1">
                  {!selectedTicket?.details?.seats_map ? (
                    <div className="flex flex-col items-start gap-1">
                      <span>{t_page('free_seating')}</span>
                      <span className="text-base font-medium leading-4 tracking-normal">
                        {t_page('seat_guaranteed')}
                      </span>
                    </div>
                  ) : (
                    <div className={`flex flex-col items-start gap-1 `}>
                      <span>{t_page('choose_place')}</span>
                      <span
                        className={`text-sm ${!!error && 'text-[#de2a1a]'}`}
                      >{`${t_page('selected_place')} ${selectedSeats.length} ${t_page('selected_seats_status')} ${passengers.length} ${t_page('place')}`}</span>
                    </div>
                  )}
                </div>
              ) : (
                <Skeleton className="min-w-18 h-[24px]" />
              )}
            </div>
            <ChevronRight size={32} className="stroke-[#6f8b90]" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="sr-only"></SheetTitle>
            <SheetDescription className="sr-only"></SheetDescription>
            <SheetClose asChild>
              <Button
                type="button"
                variant={'link'}
                className="gap-0.2 text-slate-700 dark:text-slate-50 text-base font-bold leading-6 tracking-normal"
              >
                <ChevronLeft size={24} />
                {t_common('backBtn')}
              </Button>
            </SheetClose>
          </SheetHeader>
          <ScrollArea className="relative w-full px-5 mx-auto overflow-y-scroll grow bg-slate-50 dark:bg-slate-900 shadow-xs">
            <div className="my-10 flex flex-col gap-2">
              {seatMapWithStatus.length === 1 && <SeatsList helm={true} seatRows={seatMapWithStatus[0].seats} />}

              {seatMapWithStatus.length >= 2 && (
                <FloorSheet
                  floor_first={<SeatsList helm={true} seatRows={seatMapWithStatus[0].seats} />}
                  floor_second={<SeatsList seatRows={seatMapWithStatus[1].seats} />}
                />
              )}
            </div>
          </ScrollArea>

          <SheetFooter className="flex flex-row justify-between gap-2 bg-white dark:bg-slate-800 ">
            <div className="flex flex-col items-center justify-center w-1/2 gap-1">
              <div className="text-sm font-normal leading-4 tracking-normal text-slate-700 dark:text-slate-50">
                {!!selectedSeats ? t_page('seats_selected') : t_page('no_seats')}
              </div>
              <div className="text-base font-bold leading-6 tracking-normal text-slate-700 dark:text-slate-50">
                {Array.isArray(selectedSeats) ? selectedSeats.length : 0}
              </div>
            </div>
            <div className="w-1/2">
              <SheetClose asChild>
                <Button
                  disabled={selectedSeats === 0}
                  type="button"
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
    </>
  );
});

export default Booking;
