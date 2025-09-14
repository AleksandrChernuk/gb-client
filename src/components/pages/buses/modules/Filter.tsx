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
import { ScrollArea } from '@/components/ui/scroll-area';
import { SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from 'next-intl';
import { useFilterTickets } from '@/store/useFilterTickets';
import { useSearchStore } from '@/store/useSearch';
import { useShallow } from 'zustand/react/shallow';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import useTicketsSearch from '../hooks/useTicketsSearch';
import FilterSortByList from '../components/FilterRadioGroup';
import FilterCheckBoxList from '../components/FilterCheckBoxList';

type TMobileFilterHeader = {
  title: string;
};

const MobileFilterHeader: React.FC<TMobileFilterHeader> = ({ title }: TMobileFilterHeader) => {
  return (
    <SheetHeader className="justify-between">
      <SheetTitle className="sr-only"></SheetTitle>
      <SheetDescription className="sr-only"></SheetDescription>
      <h3 className="text-base font-bold leading-6 tracking-normal text-green-300">{title}</h3>
      <SheetClose asChild>
        <Button
          className="flex items-center gap-1 text-base font-bold leading-6 tracking-normal bg-green-300 p-2 rounded-md"
          variant={'default'}
          size={'icon'}
        >
          <X color="#ffffff" />
        </Button>
      </SheetClose>
    </SheetHeader>
  );
};

export const MobileFilter = () => {
  const resetFilters = useFilterTickets((state) => state.resetFilters);
  const { isFetching, data } = useTicketsSearch();
  const isHydrated = useSearchStore(useShallow((state) => state.isHydrated));

  const from = useSearchStore(useShallow((state) => state.from));
  const to = useSearchStore(useShallow((state) => state.to));

  const enabled = !!from?.id && !!to?.id;

  const t = useTranslations(MESSAGE_FILES.BUSES_PAGE);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          disabled={!isHydrated || isFetching || !enabled || data.length === 0}
          variant={'outline'}
          size={'icon'}
          className="p-2 rounded-md"
        >
          <SlidersHorizontal color="#098537" size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <MobileFilterHeader title={t('filter')} />

        <ScrollArea className="relative w-full px-5 mx-auto overflow-y-scroll shadow-xs grow bg-slate-50 dark:bg-slate-900">
          <div className="my-4">
            <ul>
              <li>
                <h5 className="mb-4 text-base font-bold leading-6 tracking-normal text-slate-700 dark:text-slate-50">
                  {t('sort_by')}:
                </h5>
                <FilterSortByList />
              </li>
              <Separator className="h-1 my-6 rounded-lg bg-[#e6e6e6] dark:bg-slate-700" />
              <li>
                <h5 className="mb-4 text-base font-bold leading-6 tracking-normal text-slate-700 dark:text-slate-50">
                  {t('bus_companies')}:
                </h5>
                <FilterCheckBoxList />
              </li>
            </ul>
          </div>
        </ScrollArea>

        <SheetFooter className="grid grid-cols-2 gap-2 bg-white dark:bg-slate-800 ">
          <SheetClose asChild>
            <Button
              variant={'outline'}
              size={'small_primary'}
              className="w-full px-5 py-3 text-sm font-bold tracking-normal leading-[16.8px] text-primary bg-inherit"
              onClick={() => resetFilters()}
            >
              {t('clear_all')}
            </Button>
          </SheetClose>

          <SheetClose asChild>
            <Button
              variant={'default'}
              size={'small_primary'}
              className="w-full px-5 py-3 text-sm font-bold tracking-normal leading-[16.8px]"
            >
              {t('view_trips')}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
