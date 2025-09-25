'use client';

import { IUserCompletedTrips } from '@/shared/types/profile.trips';
import { getCompletedTrips } from '@/shared/api/user.services.client';
import { useLocale, useTranslations } from 'next-intl';
import { useUserStore } from '@/shared/store/useUser';
import { usePaginatedQuery } from '@/shared/hooks/usePaginatedQuery';
import MainLoader from '@/shared/ui/MainLoader';
import { isNoTripsError, parseErrorKey } from '@/shared/utils/route.details.helper';
import RouteNotFound from '@/shared/ui/RouteNotFound';
import TryAgain from '@/entities/common/TryAgain';
import { SkeletonCards } from '@/shared/ui/SkeletonCards';
import { TRANSLATION_KEYS } from '@/shared/i18n/translationKeys';
import { TripCard } from '@/features/profile-trip-card';
import { CustomPagination } from '@/shared/ui/CustomPagination';

const perPage = 5;

const CompletedTrips = () => {
  const user = useUserStore((state) => state.currentUser);
  const t = useTranslations();

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

  if (!user?.id)
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <MainLoader />
      </div>
    );

  if (isError && isNoTripsError(error)) {
    return <RouteNotFound text={t(parseErrorKey(error))} className="dark:bg-slate-700" />;
  }

  if (isError) {
    return <TryAgain className="dark:bg-slate-700" />;
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1">
        <div className="container mx-auto max-w-[805px] py-6">
          {isLoading || isFetching ? (
            <SkeletonCards items={perPage} />
          ) : !data || !data.data?.length ? (
            <RouteNotFound text={t(TRANSLATION_KEYS.common.not_found)} className="dark:bg-slate-700" />
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
        <CustomPagination
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
