'use client';

import { updateRouteDetails } from '@/features/route-card/helpers/updateRouteDetails';
import { getRouteDetails } from '@/shared/api/route.actions';
import { useRouter } from '@/shared/i18n/routing';
import { buildRouteDetailsRequest, RouteDetailsParams } from '@/shared/lib/buildRouteDetailsRequest';
import { useSelectedTickets } from '@/shared/store/useSelectedTickets';
import { IRouteResponse, IRouteDetailsResponse } from '@/shared/types/route.types';
import { useQueryClient } from '@tanstack/react-query';

export function useSelectTicket() {
  const { setSelectedTicket, setLoading } = useSelectedTickets();
  const router = useRouter();
  const queryClient = useQueryClient();

  return async (route: IRouteResponse, params: RouteDetailsParams) => {
    if (['EUROCLUB'].includes(route.providerName)) {
      setSelectedTicket(route);
      router.push('/checkout');
      return;
    }

    setLoading(route.ticketId);

    try {
      const requestBody = buildRouteDetailsRequest(params);

      const details = await queryClient.fetchQuery<IRouteDetailsResponse | null>({
        queryKey: ['route-details', route.ticketId, params],
        queryFn: () => getRouteDetails(requestBody),
      });

      const updatedRoute = updateRouteDetails(route, details);

      setSelectedTicket(updatedRoute);
      router.push('/checkout');
    } finally {
      setLoading(null);
    }
  };
}
