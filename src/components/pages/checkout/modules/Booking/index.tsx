'use client'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useCurrentRouteStore } from '@/store/useCurrentRoute'
import { useTranslations } from 'next-intl'
import IconSeat from '../../icons/IconSeat'
import SeatsList from './SeatsList'

export default function BookingSheet() {
  const сurrentRoute = useCurrentRouteStore((state) => state.сurrentRoute)
  const t = useTranslations('new_order')

  if (!сurrentRoute) {
    return null
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant={'outline'}
          type='button'
          className='flex items-center justify-between rounded-lg w-full h-auto p-3 bg-inherit border border-gray_1 hover:bg-grayy dark:hover:bg-dark_bg dark:border-black_2_for_text dark:hover:border-black_2_for_text active:border-black_2_for_text dark:active:border-dark_bg'
        >
          <div className='flex items-center gap-2 tablet:gap-4'>
            <div className='[&_svg]:fill-gray_2_for_body w-[45px] h-[56px]'>
              <IconSeat />
            </div>
            <div className='h5 text-text_prymery'>
              {!сurrentRoute?.details?.seats_map ? (
                <div className='flex flex-col items-start gap-1'>
                  <span>{t('free_seating')}</span>
                  <span className='addional_medium_text'>{t('seat_guaranteed')}</span>
                </div>
              ) : (
                t('choose_place')
              )}
            </div>
          </div>
          <ChevronRight size={32} className='stroke-gray_2_for_body' />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className='sr-only'>Edit profile</SheetTitle>
          <SheetDescription className='sr-only'>
            Make changes to your profile here. Click save when youre done.
          </SheetDescription>
          <SheetClose asChild>
            <Button type='button' variant={'link'} className='gap-0.2 text-text_prymery h5'>
              <ChevronLeft size={24} />
              Back
            </Button>
          </SheetClose>
        </SheetHeader>
        <ScrollArea className='relative px-5 mx-auto overflow-y-scroll grow bg-grayy dark:bg-dark_bg shadow-2xs  w-full'>
          <div className='my-10'>
            {сurrentRoute &&
              сurrentRoute?.details?.seats_map &&
              Array.isArray(сurrentRoute?.details?.seats_map) &&
              сurrentRoute?.details?.seats_map.map((block, i) => (
                <SeatsList
                  seatRows={block.seats}
                  key={i}
                  helm={!i}
                  floorText={
                    сurrentRoute?.details?.seats_map &&
                    Array.isArray(сurrentRoute?.details?.seats_map) &&
                    сurrentRoute?.details?.seats_map.length === 2 &&
                    `Поверх ${i + 1}`
                  }
                />
              ))}
          </div>
        </ScrollArea>

        <SheetFooter className='flex flex-row justify-between gap-2 bg-white dark:bg-dark_main  '>
          <div className='w-1/2 flex flex-col items-start justify-center'>
            <div className='addional_regular_text text-text_prymery'>No seats are booked</div>
            <div className='h5 text-text_prymery'>0</div>
          </div>
          <div className='w-1/2'>
            <SheetClose asChild>
              <Button type='button' className='py-2 px-3 w-full' variant={'default'}>
                Confirm
              </Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
