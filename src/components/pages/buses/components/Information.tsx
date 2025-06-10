'use client';

import { CustomCard } from '@/components/shared/CustomCard';
import { format, toDate } from 'date-fns';
import { useShallow } from 'zustand/react/shallow';
import { Skeleton } from '@/components/ui/skeleton';
import useDateLocale from '@/hooks/useDateLocale';
import { useSearchStore } from '@/store/useSearch';
import { useLocale, useTranslations } from 'next-intl';
import { extractLocationDetails } from '@/lib/extractLocationDetails';
import { ArrowRight } from 'lucide-react';
import { useFilterTickets } from '@/store/useFilterTickets';
import useTicketsSearch from '../hooks/useTicketsSearch';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { MobileFilter } from '../modules/Filter';

export const Information = () => {
  const date = useSearchStore(useShallow((state) => state.date));
  const from = useSearchStore(useShallow((state) => state.from));
  const to = useSearchStore(useShallow((state) => state.to));
  const isHydrated = useSearchStore(useShallow((state) => state.isHydrated));
  const filteredTickets = useFilterTickets((state) => state.filteredTickets);

  const { isFetching } = useTicketsSearch();
  const t = useTranslations(MESSAGE_FILES.BUSES_PAGE);
  const currentLanguage = useLocale();
  const { locale } = useDateLocale();

  return (
    <CustomCard className="p-5 space-y-4 shadow-xs">
      <div className="flex items-center justify-between">
        {isHydrated ? (
          <h3 className="text-2xl font-bold tracking-normal leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px] text-slate-700 dark:text-slate-50 first-letter:uppercase">
            {format(toDate(date), 'eee, d MMM', { locale })}
          </h3>
        ) : (
          <Skeleton className="h-[28px] min-w-20" />
        )}

        <div>
          <MobileFilter />
        </div>
      </div>
      <div className="flex items-center justify-between gap-1">
        <div className="flex items-center gap-2 text-base font-normal leading-6 tracking-normal text-slate-400 dark:text-slate-200 text-[12px] tablet:leading-4 tetx-slate-700 tablet:text-sm  text-nowrap truncate">
          {from ? (
            <div>
              {from && extractLocationDetails(from, currentLanguage).locationName},{' '}
              {from && extractLocationDetails(from, currentLanguage).countryName}
            </div>
          ) : (
            <Skeleton className="h-3 bg-green-50 dark:bg-slate-700 min-w-20" />
          )}
          <div className="w-3 h-3 grow">
            <ArrowRight size={12} className="stroke-slate-700 dark:stroke-slate-200" />
          </div>
          {to ? (
            <div className="flex items-center">
              {to && extractLocationDetails(to, currentLanguage).locationName},{' '}
              {to && extractLocationDetails(to, currentLanguage).countryName}
            </div>
          ) : (
            <Skeleton className="h-3 bg-green-50 dark:bg-slate-700 min-w-20" />
          )}
        </div>
        <div className="text-[12px]  tablet:text-sm leading-6  text-green-300 text-nowrap truncate">
          {`${isFetching ? 0 : filteredTickets?.length} ${t('resul_count')}`}
        </div>
      </div>
    </CustomCard>
  );
};
