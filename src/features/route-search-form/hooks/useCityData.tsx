// 'use client';

// import { useRouterSearch } from '@/shared/hooks/useRouterSearch';
// import { useLocationsStore } from '@/shared/store/useLocations';
// import { useMemo } from 'react';

// export const useCityData = () => {
//   const [params] = useRouterSearch();

//   const locations = useLocationsStore((state) => state.locations);

//   const fromCity = useMemo(
//     () => locations?.find((loc) => loc.id === Number(params.from)) || null,
//     [locations, params.from],
//   );

//   const toCity = useMemo(() => locations?.find((loc) => loc.id === Number(params.to)) || null, [locations, params.to]);

//   return { fromCity, toCity };
// };
'use client';

import { fetchLocationById } from '@/features/route-search-form/api/location.api';
import useSearchRouteParams from '@/features/route-search-form/hooks/useCitySearch';
import { useQuery } from '@tanstack/react-query';

export const useCityData = () => {
  const {
    values: { from, to },
  } = useSearchRouteParams();

  const { data: fromCity = null } = useQuery({
    queryKey: ['location', from],
    queryFn: () => fetchLocationById(Number(from)),
    enabled: !!from && Number(from) > 0,
    staleTime: 1000 * 60 * 60,
  });

  const { data: toCity = null } = useQuery({
    queryKey: ['location', to],
    queryFn: () => fetchLocationById(Number(to)),
    enabled: !!to && Number(to) > 0,
    staleTime: 1000 * 60 * 60,
  });

  return { fromCity, toCity };
};
