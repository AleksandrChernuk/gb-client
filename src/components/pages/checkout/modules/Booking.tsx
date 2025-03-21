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
import SeatsList from '../components/SeatsList';
import IconSeat from '../icons/IconSeat';

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
          className="flex items-center justify-between w-full h-auto p-3 border rounded-lg bg-inherit border-gray_1 hover:bg-grayy dark:hover:bg-dark_bg dark:border-black_2_for_text dark:hover:border-black_2_for_text active:border-black_2_for_text dark:active:border-dark_bg"
        >
          <div className="flex items-center gap-2 tablet:gap-4">
            <div className="[&_svg]:fill-gray_2_for_body w-[45px] h-[56px]">
              <IconSeat />
            </div>

            {isHydrated ? (
              <div className="h5 text-text_prymery ">
                {!selectedTicket?.details?.seats_map ? (
                  <div className="flex flex-col items-start gap-1">
                    <span>{t('free_seating')}</span>
                    <span className="addional_medium_text">{t('seat_guaranteed')}</span>
                  </div>
                ) : (
                  t('choose_place')
                )}
              </div>
            ) : (
              <Skeleton className="min-w-18 h-[24px]" />
            )}
          </div>
          <ChevronRight size={32} className="stroke-gray_2_for_body" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="sr-only">Edit profile</SheetTitle>
          <SheetDescription className="sr-only">
            Make changes to your profile here. Click save when youre done.
          </SheetDescription>
          <SheetClose asChild>
            <Button type="button" variant={'link'} className="gap-0.2 text-text_prymery h5">
              <ChevronLeft size={24} />
              Back
            </Button>
          </SheetClose>
        </SheetHeader>
        <ScrollArea className="relative w-full px-5 mx-auto overflow-y-scroll grow bg-grayy dark:bg-dark_bg shadow-2xs">
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

        <SheetFooter className="flex flex-row justify-between gap-2 bg-white dark:bg-dark_main ">
          <div className="flex flex-col items-start justify-center w-1/2">
            <div className="addional_regular_text text-text_prymery">No seats are booked</div>
            <div className="h5 text-text_prymery">0</div>
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
