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
import { ScrollArea } from '@/components/ui/scroll-area'
import { SlidersHorizontal, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useTranslations } from 'next-intl'
import FilterCheckBoxList from '../Filter/FilterCheckBoxList'
import FilterSortByList from '../Filter/FilterRadioGroup'
import { useFilterTicketsStore } from '@/store/useFilterTickets'
import { useSearchStore } from '@/store/useSearch'
import { useShallow } from 'zustand/react/shallow'
import useTicketsSearch from '../../hooks/useTicketsSearch'

type TMobileFilterHeader = {
  title: string
}

const MobileFilterHeader = ({ title }: TMobileFilterHeader) => {
  return (
    <SheetHeader className='justify-between'>
      <SheetTitle className='sr-only'>Edit profile</SheetTitle>
      <SheetDescription className='sr-only'>
        Make changes to your profile here. Click save when youre done.
      </SheetDescription>
      <h3 className='font-medium h5 text-primary_1'>{title}</h3>
      <SheetClose asChild>
        <Button
          variant={'default'}
          className='flex items-center gap-1 p-1 rounded-md h5 bg-primary_1'
        >
          <X color='#ffffff' />
        </Button>
      </SheetClose>
    </SheetHeader>
  )
}

export const MobileFilter = () => {
  const resetFilters = useFilterTicketsStore((state) => state.resetFilters)
  const { isFetching } = useTicketsSearch()
  const isHydrated = useSearchStore(useShallow((state) => state.isHydrated))

  const t = useTranslations('common')

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          disabled={!isHydrated || isFetching}
          variant={'outline'}
          className='p-2 rounded-lg border-primary'
        >
          <SlidersHorizontal color='#098537' size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <MobileFilterHeader title={t('filter')} />

        <ScrollArea className='relative px-5 mx-auto overflow-y-scroll grow bg-grayy dark:bg-dark_bg shadow-2xs  w-full'>
          <div className='my-4'>
            <ul>
              <li>
                <h5 className='mb-4 h5 text-text_prymery'>{t('sort_by')}:</h5>
                <FilterSortByList />
              </li>
              <Separator className='h-1 my-6 rounded-lg bg-gray_0 dark:bg-black_2_for_text' />
              <li>
                <h5 className='mb-4 h5 text-text_prymery'>{t('bus_companies')}:</h5>
                <FilterCheckBoxList />
              </li>
            </ul>
          </div>
        </ScrollArea>

        <SheetFooter className='flex flex-row justify-between gap-2 bg-white dark:bg-dark_main  '>
          <SheetClose asChild>
            <Button
              variant={'outline'}
              className='w-full px-5 py-3 button_mobile text-primary bg-inherit'
              onClick={() => resetFilters()}
            >
              {t('clear_all')}
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button variant={'default'} className='w-full px-5 py-3 button_mobile'>
              {t('view_trips')}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
