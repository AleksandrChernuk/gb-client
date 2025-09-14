'use client';

import { IUserCompletedTrips } from '@/types/profile.trips';
import { getCompletedTrips } from '@/actions/user.services.client';
import { useLocale } from 'next-intl';
import { useUserStore } from '@/store/useUser';
import MainLoader from '@/components/shared/MainLoader';
import { TripCard } from '../modules/TripCard';
import { Pagination } from '@/components/shared/Pagination';
import { usePaginatedQuery } from '@/hooks/usePaginatedQuery';
import NoTripsFind from '@/components/shared/NoTripsFind';
import { isNoTripsError } from '../../orders/helpers/isNoTripsError';
import TryAgain from '@/components/shared/TryAgain';
import { SkeletonCards } from '@/components/shared/SkeletonCards';

const perPage = 5;

const CompletedTrips = () => {
  const user = useUserStore((state) => state.currentUser);
  const locale = useLocale();

  const { data, isLoading, isFetching, isError, error, currentPage, handlePageChange, totalPages } =
    usePaginatedQuery<IUserCompletedTrips>({
      baseKey: ['completedTrips', user?.id, locale],
      enabled: Boolean(user?.id),
      perPage,
      initialPage: 1,
      fetchPage: (page, perPageArg) => getCompletedTrips({ userId: user!.id, locale, page, perPage: perPageArg }),
      getTotalPages: (d) => d?.pagination?.totalPages ?? 1,
    });

  if (!user?.id) return <MainLoader className="min-h-full flex items-center justify-center" />;

  if (isError && isNoTripsError(error)) {
    return (
      <NoTripsFind text="error_load_trips" className="dark:bg-slate-700 min-h-full flex items-center justify-center" />
    );
  }

  if (isError) {
    return <TryAgain className="min-h-full flex items-center justify-center" />;
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1">
        <div className="container mx-auto max-w-[805px] py-6">
          {isLoading || isFetching ? (
            <SkeletonCards items={perPage} />
          ) : !data || !data.data?.length ? (
            <NoTripsFind
              text="no_travel_find"
              className="dark:bg-slate-700 min-h-full flex items-center justify-center"
            />
          ) : (
            <div className="space-y-8">
              {data.data.map((trip) => (
                <TripCard item={trip} key={trip.myOrderId} />
              ))}
            </div>
          )}
        </div>
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          maxVisiblePages={3}
        />
      )}
    </div>
  );
};

export default CompletedTrips;
