'use client';

import { getCurrentTrips } from '@/actions/user.services.client';
import { useUserStore } from '@/store/useUser';
import { UserCurrentTripType } from '@/types/profile.trips';
import { useLocale, useTranslations } from 'next-intl';
import { TripCard } from './TripCard';
import { useQuery } from '@tanstack/react-query';
import { SkeletonCards } from '@/components/shared/SkeletonCards';
import NoTripsFind from '@/components/shared/NoTripsFind';
import { isNoTripsError, parseErrorKey } from '../../common/helpers';
import MainLoader from '@/components/shared/MainLoader';
import TryAgain from '@/components/shared/TryAgain';
import { TRANSLATION_KEYS } from '@/i18n/translationKeys';

const FutureTrips = () => {
  const user = useUserStore((state) => state.currentUser);
  const locale = useLocale();
  const t = useTranslations();

  const { data, isLoading, isFetching, isError, error } = useQuery<UserCurrentTripType[]>({
    queryKey: ['current-trips', user?.id, locale],
    queryFn: () => getCurrentTrips(user!.id, locale),
    enabled: Boolean(user?.id),
    staleTime: 60_000,
    retry: false,
  });

  if (!user?.id)
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <MainLoader />
      </div>
    );

  if (isError && isNoTripsError(error)) {
    return <NoTripsFind text={t(parseErrorKey(error.message))} className="dark:bg-slate-700" />;
  }

  if (isError) {
    return <TryAgain className="dark:bg-slate-700" />;
  }

  return (
    <div className="container mx-auto max-w-[805px] py-6">
      {isLoading || isFetching ? (
        <SkeletonCards items={1} />
      ) : !data || !data?.length ? (
        <NoTripsFind text={t(TRANSLATION_KEYS.common.not_found)} className="dark:bg-slate-700" />
      ) : (
        <div className="space-y-8">
          {data.map((trip) => (
            <TripCard item={trip} key={trip.myOrderId} showDetails />
          ))}
        </div>
      )}
    </div>
  );
};

export default FutureTrips;
