'use client';

import useTicketsSearch from '@/shared/hooks/useTicketsSearch';
import { BusLoader } from '@/shared/ui/BusLoader';
import RouteNotFound from '@/shared/ui/RouteNotFound';
import { CustomError } from '@/entities/common/CustomError';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { useRouterSearch } from '@/shared/hooks/useRouterSearch';
import { useFilterTickets } from '@/shared/store/useFilterTickets';
import { SingleRouteCard } from '@/features/route-card/variants-ui/SingleRouteCard';

export default function ResultList() {
  const t = useTranslations(MESSAGE_FILES.COMMON);
  const { isFetching, error } = useTicketsSearch();
  const filteredTickets = useFilterTickets((state) => state.filteredTickets);

  const [params] = useRouterSearch();

  if (isFetching) {
    return (
      <div className="pt-10">
        <BusLoader className={'flex items-center justify-center my-2'} />
      </div>
    );
  }
  if (error) return <CustomError />;

  if (!isFetching && filteredTickets && filteredTickets.length === 0)
    return <RouteNotFound text={t('no_travel_find')} />;

  if (!params.from || !params.to) return <CustomError />;

  const tocobusTickets = filteredTickets?.filter((route) => route.providerName === 'TOCOBUS');

  if (!tocobusTickets || tocobusTickets.length === 0) {
    return <RouteNotFound text={t('no_travel_find')} />;
  }

  return (
    <div className="flex flex-col space-y-10">
      {tocobusTickets.map((route) => (
        <SingleRouteCard key={route.ticketId} data={route} />
      ))}
    </div>
  );
}
