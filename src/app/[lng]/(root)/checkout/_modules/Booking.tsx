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
import { useCurrentTicketStore } from '@/store/useCurrentTicket';
import { useTranslations } from 'next-intl';
import { Skeleton } from '@/components/ui/skeleton';
import SeatsList from './components/SeatsList';
import IconSeat from './icons/IconSeat';

export default function BookingSheet() {
  const selectedTicket = useCurrentTicketStore((state) => state.selectedTicket);
  const isHydrated = useCurrentTicketStore((state) => state.isHydrated);

  const t = useTranslations('new_order');

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          disabled={!selectedTicket?.details?.seats_map}
          variant={'outline'}
          type="button"
          className="flex items-center justify-between w-full h-auto p-3 border rounded-lg bg-inherit border-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 dark:border-slate-700 dark:hover:border-slate-700 active:border-slate-700 dark:active:border-slate-900"
        >
          <div className="flex items-center gap-2 tablet:gap-4">
            <div className="[&_svg]:fill-[#6f8b90] w-[45px] h-[56px]">
              <IconSeat />
            </div>

            {isHydrated ? (
              <div className="text-base font-bold leading-6 tracking-normal text-slate-700 dark:text-slate-50">
                {!selectedTicket?.details?.seats_map ? (
                  <div className="flex flex-col items-start gap-1">
                    <span>{t('free_seating')}</span>
                    <span className="text-base font-medium leading-4 tracking-normal">{t('seat_guaranteed')}</span>
                  </div>
                ) : (
                  t('choose_place')
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
          <SheetTitle className="sr-only">Edit profile</SheetTitle>
          <SheetDescription className="sr-only">
            Make changes to your profile here. Click save when youre done.
          </SheetDescription>
          <SheetClose asChild>
            <Button
              type="button"
              variant={'link'}
              className="gap-0.2 text-slate-700 dark:text-slate-50 text-base font-bold leading-6 tracking-normal"
            >
              <ChevronLeft size={24} />
              Back
            </Button>
          </SheetClose>
        </SheetHeader>
        <ScrollArea className="relative w-full px-5 mx-auto overflow-y-scroll grow bg-slate-50 dark:bg-slate-900 shadow-xs">
          <div className="my-10">
            {selectedTicket &&
              selectedTicket?.details?.seats_map &&
              Array.isArray(selectedTicket?.details?.seats_map) &&
              selectedTicket?.details?.seats_map.map((block, i) => (
                <SeatsList
                  seatRows={block.seats}
                  key={i}
                  helm={!i}
                  floorText={
                    selectedTicket?.details?.seats_map &&
                    Array.isArray(selectedTicket?.details?.seats_map) &&
                    selectedTicket?.details?.seats_map.length === 2 &&
                    `Поверх ${i + 1}`
                  }
                />
              ))}
          </div>
        </ScrollArea>

        <SheetFooter className="flex flex-row justify-between gap-2 bg-white dark:bg-slate-800 ">
          <div className="flex flex-col items-start justify-center w-1/2">
            <div className="text-sm font-normal leading-4 tracking-normal text-slate-700 dark:text-slate-50">
              No seats are booked
            </div>
            <div className="text-base font-bold leading-6 tracking-normal text-slate-700 dark:text-slate-50">0</div>
          </div>
          <div className="w-1/2">
            <SheetClose asChild>
              <Button type="button" className="w-full px-3 py-2" variant={'default'}>
                Confirm
              </Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
