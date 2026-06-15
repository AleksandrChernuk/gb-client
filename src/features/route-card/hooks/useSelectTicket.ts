'use client';

import { updateRouteDetails } from '@/features/route-card/helpers/updateRouteDetails';
import { getRouteDetails } from '@/shared/api/route.actions';
import { useRouter } from '@/shared/i18n/routing';
import { buildRouteDetailsRequest, RouteDetailsParams } from '@/shared/lib/buildRouteDetailsRequest';
import { TOrderType, useSelectedTickets } from '@/shared/store/useSelectedTickets';
import { IRouteResponse, IRouteDetailsResponse } from '@/shared/types/route.types';
import { useQueryClient } from '@tanstack/react-query';
import { useRouterSearch } from '@/shared/hooks/useRouterSearch';

export function useSelectTicket() {
  const { setSelectedTicket, setLoading } = useSelectedTickets();
  const [params] = useRouterSearch();
  const router = useRouter();
  const queryClient = useQueryClient();

  return async (route: IRouteResponse, detailsParams: RouteDetailsParams, orderType: TOrderType = 'BOOK') => {
    if (['euroclub'].includes(route.providerName.toLowerCase())) {
      setSelectedTicket({ route: route, voyagers: params.voyagers, orderType });

      router.push('/checkout/');
      return;
    }

    setLoading(route.ticketId);

    try {
      const requestBody = buildRouteDetailsRequest(detailsParams);

      const details = await queryClient.fetchQuery<IRouteDetailsResponse | null>({
        queryKey: ['route-details', route.ticketId, params],
        queryFn: () => getRouteDetails(requestBody),
        // на момент выбора всегда тянем свежие детали (юзер мог долго висеть на странице),
        // не полагаясь на разницу ключей кэша
        staleTime: 0,
      });

      const updatedRoute = updateRouteDetails(route, details);

      setSelectedTicket({ route: updatedRoute, voyagers: params.voyagers, orderType });

      router.push('/checkout/');
    } finally {
      setLoading(null);
    }
  };
}
