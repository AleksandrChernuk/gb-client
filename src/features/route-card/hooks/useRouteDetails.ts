import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getRouteDetails } from '@/shared/api/route.actions';
import { buildRouteDetailsRequest, RouteDetailsParams } from '@/shared/lib/buildRouteDetailsRequest';

type Props = {
  ticketId: string;
  params: RouteDetailsParams;
  providerName: string;
};

export function useRouteDetails({ ticketId, params, providerName }: Props) {
  const [enabled, setEnabled] = useState(false);

  const queryKey = ['route-details', ticketId, params];

  const {
    data: details,
    isLoading,
    error,
  } = useQuery({
    queryKey,
    queryFn: async () => {
      const requestBody = buildRouteDetailsRequest({ ...params });
      return await getRouteDetails(requestBody);
    },
    enabled: enabled && !['EUROCLUB'].includes(providerName),
    staleTime: 5 * 60 * 1000,
  });

  const fetchDetails = () => setEnabled(true);
  return {
    details,
    isLoading,
    error,
    fetchDetails,
    hasDetails: !!details,
  };
}
