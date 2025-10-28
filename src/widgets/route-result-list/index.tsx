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
import { adaptRoutesForRender, TAdaptedRoute } from '@/shared/lib/adaptRoutesForRender';

export default function ResultList() {
  const t = useTranslations(MESSAGE_FILES.COMMON);
  const { isFetching, error, data } = useTicketsSearch();
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

  if (!isFetching && !data && filteredTickets && filteredTickets.length === 0)
    return <RouteNotFound text={t('no_travel_find')} />;

  if (!params.from || !params.to) return <CustomError />;

  const adapted = adaptRoutesForRender(data);

  const singleRoutes = adapted.filter((r: TAdaptedRoute) => r.type === 'single');

  const plainRoutes = singleRoutes.map((r) => r.data);
  return (
    <div className="flex flex-col space-y-10">
      {plainRoutes.map((route, i) => (
        <SingleRouteCard key={i} data={route} />
      ))}
    </div>
  );
}
