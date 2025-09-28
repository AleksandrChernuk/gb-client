'use client';

import { ArrowRight } from 'lucide-react';
import { useFilterTickets } from '@/shared/store/useFilterTickets';
import useTicketsSearch from '@/shared/hooks/useTicketsSearch';
import { useLocale, useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { useSearchStore } from '@/shared/store/useSearch';
import { useShallow } from 'zustand/react/shallow';
import useDateLocale from '@/shared/hooks/useDateLocale';
import CustomCard from '@/shared/ui/CustomCard';
import { formatDate, toDate } from 'date-fns';
import { Skeleton } from '@/shared/ui/skeleton';
import { MobileFilter } from '@/features/route-mobile-filter';
import { extractLocationDetails } from '@/shared/lib/extractLocationDetails';
import { useCityData } from '@/features/route-search-form/model/useCityData';

export const RoutesResaltInformation = () => {
  const { fromCity, toCity } = useCityData();
  const date = useSearchStore(useShallow((state) => state.date));
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
            {formatDate(toDate(date), 'eee, d MMM', { locale })}
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
          {fromCity ? (
            <div>
              {fromCity && extractLocationDetails(fromCity, currentLanguage).locationName},{' '}
              {fromCity && extractLocationDetails(fromCity, currentLanguage).countryName}
            </div>
          ) : (
            <Skeleton className="h-3 bg-green-50 dark:bg-slate-700 min-w-20" />
          )}
          <div className="w-3 h-3 grow">
            <ArrowRight size={12} className="stroke-slate-700 dark:stroke-slate-200" />
          </div>
          {toCity ? (
            <div className="flex items-center">
              {toCity && extractLocationDetails(toCity, currentLanguage).locationName},{' '}
              {toCity && extractLocationDetails(toCity, currentLanguage).countryName}
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
