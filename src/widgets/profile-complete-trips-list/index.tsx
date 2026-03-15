'use client';

import { IUserCompletedTrips } from '@/shared/types/profile.trips';
import { getCompletedTrips } from '@/shared/api/user.services.client';
import { useLocale, useTranslations } from 'next-intl';
import { useUserStore } from '@/shared/store/useUser';
import { usePaginatedQuery } from '@/shared/hooks/usePaginatedQuery';
import { isNoTripsError, parseErrorKey } from '@/shared/utils/route.details.helper';
import RouteNotFound from '@/shared/ui/RouteNotFound';
import TryAgain from '@/entities/common/TryAgain';
import { SkeletonCards } from '@/shared/ui/SkeletonCards';
import { TRANSLATION_KEYS } from '@/shared/i18n/translationKeys';
import { TripCard } from '@/features/profile-trip-card';
import { CustomPagination } from '@/shared/ui/CustomPagination';

const perPage = 5;

export default function CompletedTrips() {
  const user = useUserStore((state) => state.currentUser);
  const t = useTranslations();
  const locale = useLocale();

  const { data, isLoading, isError, error, currentPage, handlePageChange, totalPages } =
    usePaginatedQuery<IUserCompletedTrips>({
      baseKey: ['completedTrips', user?.id, locale],
      enabled: Boolean(user?.id),
      perPage,
      initialPage: 1,
      fetchPage: (page, perPageArg) => getCompletedTrips({ userId: user?.id ?? '', locale, page, perPage: perPageArg }),
      getTotalPages: (d) => d?.pagination?.totalPages ?? 1,
    });

  if (!user) return null;
  if (isLoading) return <SkeletonCards items={perPage} />;
  if (isError && isNoTripsError(error)) {
    return <RouteNotFound text={t(parseErrorKey(error))} className="dark:bg-slate-700" />;
  }
  if (isError) return <TryAgain className="dark:bg-slate-700" />;
  if (!data?.data?.length) {
    return <RouteNotFound text={t(TRANSLATION_KEYS.common.not_found)} className="dark:bg-slate-700" />;
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1">
        <div className="space-y-8 py-6">
          {data.data.map((trip) => (
            <TripCard item={trip} key={trip.myOrderId} />
          ))}
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
}
