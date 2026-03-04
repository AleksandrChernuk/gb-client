// features/trip-search/ui/TripSearch.tsx
import { Suspense } from 'react';
import { getFavoriteLocations, getLocationById } from '@/shared/api/location.actions';
import { TripSearchForm } from './TripSearchForm';
import { TripSearchSkeleton } from '@/features/trip-search/ui/TripSearchSkeleton';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

type Props = {
  from?: string;
  to?: string;
};

async function TripSearchInner({ from, to }: Props) {
  const queryClient = new QueryClient();
  const initialFavorites = await getFavoriteLocations();

  if (from)
    await queryClient.prefetchQuery({
      queryKey: ['location', from],
      queryFn: () => getLocationById(Number(from)),
    });

  if (to)
    await queryClient.prefetchQuery({
      queryKey: ['location', to],
      queryFn: () => getLocationById(Number(to)),
    });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TripSearchForm initialFavorites={initialFavorites} />
    </HydrationBoundary>
  );
}

export function TripSearch({ from, to }: Props) {
  return (
    <Suspense fallback={<TripSearchSkeleton />}>
      <TripSearchInner from={from} to={to} />
    </Suspense>
  );
}
