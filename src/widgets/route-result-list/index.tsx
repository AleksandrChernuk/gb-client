'use client';

import useTicketsSearch from '@/shared/hooks/useTicketsSearch';
import { BusLoader } from '@/shared/ui/BusLoader';
import { CustomError } from '@/entities/common/CustomError';
import { CalendarX2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { useRouterSearch } from '@/shared/hooks/useRouterSearch';
import { SingleRouteCard } from '@/features/route-card/variants-ui/SingleRouteCard';
import { useMemo } from 'react';
import { sortRoutes } from '@/shared/lib/sortRoutes';

const EXCLUDED_PROVIDERS = ['TOCOBUS', 'EUROCLUB', 'EWE'];

type ResultListProps = {
  showMissingSearchError?: boolean;
  heading?: React.ReactNode;
};

export default function ResultList({ showMissingSearchError = true, heading }: ResultListProps) {
  const t = useTranslations(MESSAGE_FILES.COMMON);
  const [params] = useRouterSearch();
  const { isFetching, error, tickets } = useTicketsSearch();

  const sortedTickets = useMemo(() => {
    if (!tickets.length) return [];
    return sortRoutes(params.sort, tickets).filter((route) => !EXCLUDED_PROVIDERS.includes(route.providerName));
  }, [tickets, params.sort]);

  // Без обраних from/to нічого не показуємо — навіть заголовок (результати з беку
  // приходять лише після пошуку).
  if (!params.from || !params.to) {
    return showMissingSearchError ? <CustomError /> : null;
  }

  if (isFetching) {
    return (
      <div className="space-y-5">
        {heading}
        <div className="pt-10">
          <BusLoader className="flex items-center justify-center my-2" />
        </div>
      </div>
    );
  }

  if (error) return <CustomError />;

  if (sortedTickets.length === 0) {
    return (
      <div className="space-y-5">
        {heading}
        <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <span className="mb-1 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
            <CalendarX2 className="h-6 w-6" aria-hidden="true" />
          </span>
          <p className="text-base font-semibold text-slate-800 dark:text-slate-50">{t('no_results_title')}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">{t('no_results_hint')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {heading}
      <div className="flex flex-col space-y-10">
        {sortedTickets.map((route) => (
          <SingleRouteCard key={route.ticketId} data={route} />
        ))}
      </div>
    </div>
  );
}
