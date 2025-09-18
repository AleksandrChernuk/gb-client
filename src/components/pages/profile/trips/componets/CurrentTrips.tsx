'use client';

import { getCurrentTrips } from '@/actions/user.services.client';
import { useUserStore } from '@/store/useUser';
import { UserCurrentTripType } from '@/types/profile.trips';
import { useLocale, useTranslations } from 'next-intl';
import { TripCard } from '../modules/TripCard';
import { useQuery } from '@tanstack/react-query';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { SkeletonCards } from '@/components/shared/SkeletonCards';

const CurrentTrips = () => {
  const user = useUserStore((state) => state.currentUser);
  const locale = useLocale();
  const t = useTranslations(MESSAGE_FILES.PROFILE);

  const { data, isLoading, isFetching, isError } = useQuery<UserCurrentTripType[]>({
    queryKey: ['current-trips', user?.id, locale],
    queryFn: () => getCurrentTrips(user!.id, locale),
    enabled: Boolean(user?.id),
    staleTime: 60_000,
    retry: false,
  });

  if (!user?.id || isLoading || isFetching) {
    return (
      <div className="container mx-auto max-w-[805px] py-6">
        <SkeletonCards items={1} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto max-w-[805px] py-6">
        <strong className="block text-center text-red-500">{t('error_load_trips')}</strong>
      </div>
    );
  }

  const trips = data ?? [];

  if (trips.length === 0) {
    return (
      <div className="container mx-auto max-w-[805px] py-6">
        <strong className="block text-center text-slate-500 dark:text-slate-400">{t('error_load_trips')}</strong>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-[805px] py-6">
      <div className="space-y-8">
        {trips.map((trip) => (
          <TripCard item={trip} key={trip.myOrderId} showDetails />
        ))}
      </div>
    </div>
  );
};

export default CurrentTrips;
