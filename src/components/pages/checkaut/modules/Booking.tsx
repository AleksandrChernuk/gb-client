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
import SeatsList from '../components/SeatsList';
import IconSeat from '../icons/IconSeat';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import FloorSheet from '../components/FloorSwitch';
import { useController, useFormContext, useWatch } from 'react-hook-form';
import { useMemo } from 'react';
import { TypeSeatsMap } from '@/types/seat.interface';

export default function BookingSheet() {
  const selectedTicket = useCurrentTicket((state) => state.selectedTicket);
  const isHydrated = useCurrentTicket((state) => state.isHydrated);
  const t_page = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);
  const t_form = useTranslations(MESSAGE_FILES.FORM);
  const t_common = useTranslations(MESSAGE_FILES.COMMON);
  const { control } = useFormContext();
  const selectedSeats = useWatch({ control, name: 'selected_seats' }).length;

  const {
    fieldState: { error },
  } = useController({
    name: 'selected_seats',
    control,
  });

  console.log(error);

  const array: TypeSeatsMap[] = useMemo(() => {
    const seats = selectedTicket?.details?.seats_map;
    return Array.isArray(seats) ? seats : [];
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
            className="aria-invalid:border-red-200 flex items-center justify-between w-full h-auto p-3 border rounded-lg bg-inherit border-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 dark:border-slate-700 dark:hover:border-slate-700 active:border-slate-700 dark:active:border-slate-900 text-ellipsis"
          >
            <div className="flex items-center gap-2 tablet:gap-4">
              <div className="[&_svg]:fill-[#6f8b90] w-[45px] h-[56px]">
                <IconSeat />
              </div>

              {isHydrated ? (
                <div className="text-xs tablet:text-base font-bold leading-6 tracking-normal text-slate-700 dark:text-slate-50 shrink-1">
                  {!selectedTicket?.details?.seats_map ? (
                    Boolean(error) ? (
                      <span className="text-[#de2a1a]">{t_form(`${error?.message}`)}</span>
                    ) : (
                      <div className="flex flex-col items-start gap-1">
                        <span>{t_page('free_seating')}</span>
                        <span className="text-base font-medium leading-4 tracking-normal">
                          {t_page('seat_guaranteed')}
                        </span>
                      </div>
                    )
                  ) : (
                    t_page('choose_place')
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
              {array.length === 1 && <SeatsList helm={true} seatRows={array[0].seats} />}

              {array.length >= 2 && (
                <FloorSheet
                  floor_first={<SeatsList helm={true} seatRows={array[0].seats} />}
                  floor_second={<SeatsList seatRows={array[1].seats} />}
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
                {selectedSeats}
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
}
