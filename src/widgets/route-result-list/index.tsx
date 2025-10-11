'use client';

import { useFilterTickets } from '@/shared/store/useFilterTickets';
import useTicketsSearch from '@/shared/hooks/useTicketsSearch';
import { BusLoader } from '@/shared/ui/BusLoader';
import RouteNotFound from '@/shared/ui/RouteNotFound';
import { CustomError } from '@/entities/common/CustomError';
import { RouteCard } from '@/features/route-card/RouteCard';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { useRouterSearch } from '@/shared/hooks/useRouterSearch';

export default function ResultList() {
  const t = useTranslations(MESSAGE_FILES.COMMON);
  const { isFetching, data, error } = useTicketsSearch();
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

  if (!isFetching && data && data.length === 0) return <RouteNotFound text={t('no_travel_find')} />;

  if (!params.from || !params.to) return <CustomError />;

  return (
    <div className="flex flex-col space-y-10">
      {filteredTickets.map((route) => {
        return <RouteCard key={`${route.ticketId}`} element={route} />;
      })}
    </div>
  );
}
