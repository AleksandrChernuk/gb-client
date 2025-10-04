'use client';

import { updateRouteDetails } from '@/features/route-card/helpers/updateRouteDetails';
import { getRouteDetails } from '@/shared/api/route.actions';
import { useRouter } from '@/shared/i18n/routing';
import { buildRouteDetailsRequest, RouteDetailsParams } from '@/shared/lib/buildRouteDetailsRequest';
import { useSelectedTickets } from '@/shared/store/useSelectedTickets';
import { IRouteResponse, IRouteDetailsResponse } from '@/shared/types/route.types';
import { useQueryClient } from '@tanstack/react-query';
import { useRouterSearch } from '@/shared/hooks/useRouterSearch';

export function useSelectTicket() {
  const { setSelectedTicket, setLoading } = useSelectedTickets();
  const [params] = useRouterSearch();
  const router = useRouter();
  const queryClient = useQueryClient();

  return async (route: IRouteResponse, detailsParams: RouteDetailsParams) => {
    if (['EUROCLUB'].includes(route.providerName)) {
      setSelectedTicket({ route: route, adult: params.adult, children: params.children });

      router.push('/checkout');
      return;
    }

    setLoading(route.ticketId);

    try {
      const requestBody = buildRouteDetailsRequest(detailsParams);

      const details = await queryClient.fetchQuery<IRouteDetailsResponse | null>({
        queryKey: ['route-details', route.ticketId, params],
        queryFn: () => getRouteDetails(requestBody),
      });

      const updatedRoute = updateRouteDetails(route, details);

      setSelectedTicket({ route: updatedRoute, adult: params.adult, children: params.children });

      router.push('/checkout');
    } finally {
      setLoading(null);
    }
  };
}
