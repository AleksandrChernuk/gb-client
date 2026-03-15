'use client';

import useTicketsSearch from '@/shared/hooks/useTicketsSearch';
import { BusLoader } from '@/shared/ui/BusLoader';
import RouteNotFound from '@/shared/ui/RouteNotFound';
import { CustomError } from '@/entities/common/CustomError';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { useRouterSearch } from '@/shared/hooks/useRouterSearch';
import { SingleRouteCard } from '@/features/route-card/variants-ui/SingleRouteCard';
import { useMemo } from 'react';
import { sortRoutes } from '@/shared/lib/sortRoutes';

const EXCLUDED_PROVIDERS = ['TOCOBUS', 'EUROCLUB', 'EWE'];

export default function ResultList() {
  const t = useTranslations(MESSAGE_FILES.COMMON);
  const [params] = useRouterSearch();
  const { isFetching, error, tickets } = useTicketsSearch();

  const sortedTickets = useMemo(() => {
    if (!tickets.length) return [];
    return sortRoutes(params.sort, tickets).filter((route) => !EXCLUDED_PROVIDERS.includes(route.providerName));
  }, [tickets, params.sort]);

  if (isFetching) {
    return (
      <div className="pt-10">
        <BusLoader className="flex items-center justify-center my-2" />
      </div>
    );
  }

  if (error || !params.from || !params.to) return <CustomError />;
  if (sortedTickets.length === 0) return <RouteNotFound text={t('no_travel_find')} />;

  return (
    <div className="flex flex-col space-y-10">
      {sortedTickets.map((route) => (
        <SingleRouteCard key={route.ticketId} data={route} />
      ))}
    </div>
  );
}
