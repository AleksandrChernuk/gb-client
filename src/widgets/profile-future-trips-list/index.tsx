'use client';

import TryAgain from '@/entities/common/TryAgain';
import { TripCard } from '@/features/profile-trip-card';
import { getCurrentTrips } from '@/shared/api/user.services.client';
import { TRANSLATION_KEYS } from '@/shared/i18n/translationKeys';
import { useUserStore } from '@/shared/store/useUser';
import { UserCurrentTripType } from '@/shared/types/profile.trips';
import RouteNotFound from '@/shared/ui/RouteNotFound';
import { SkeletonCards } from '@/shared/ui/SkeletonCards';
import { isNoTripsError, parseErrorKey } from '@/shared/utils/route.details.helper';
import { useQuery } from '@tanstack/react-query';
import { useLocale, useTranslations } from 'next-intl';

export default function FutureTrips() {
  const user = useUserStore((state) => state.currentUser);
  const locale = useLocale();
  const t = useTranslations();

  const { data, isLoading, isError, error } = useQuery<UserCurrentTripType[]>({
    queryKey: ['current-trips', user?.id, locale],
    queryFn: () => getCurrentTrips(user?.id ?? '', locale),
    enabled: Boolean(user?.id),
    staleTime: 60_000,
    retry: false,
  });

  if (!user) return null;
  if (isLoading) return <SkeletonCards items={1} />;
  if (isError && isNoTripsError(error)) {
    return <RouteNotFound text={t(parseErrorKey(error.message))} className="dark:bg-slate-700" />;
  }
  if (isError) return <TryAgain className="dark:bg-slate-700" />;
  if (!data?.length) {
    return <RouteNotFound text={t(TRANSLATION_KEYS.common.not_found)} className="dark:bg-slate-700" />;
  }

  return (
    <div className="space-y-8 py-6">
      {data.map((trip) => (
        <TripCard item={trip} key={trip.myOrderId} showDetails />
      ))}
    </div>
  );
}
