'use client';

import { getCurrentTrips } from '@/actions/user.services.client';
import { useUserStore } from '@/store/useUser';
import { UserCurrentTripType } from '@/types/profile.trips';
import { useLocale, useTranslations } from 'next-intl';
import { MainLoader } from '@/components/shared/MainLoader';
import { TripCard } from './TripCard';
import { useQuery } from '@tanstack/react-query';
import { MESSAGE_FILES } from '@/config/message.file.constans';

const CurrentTrips = () => {
  const locale = useLocale();
  const { currentUser } = useUserStore();
  const t = useTranslations(MESSAGE_FILES.PROFILE);

  const { data, isLoading, isFetching, isError } = useQuery<UserCurrentTripType[]>({
    queryKey: ['current-trips', currentUser?.id, locale],
    queryFn: () => getCurrentTrips(currentUser!.id, locale),
    enabled: Boolean(currentUser?.id),
    staleTime: 60_000,
    retry: false,
  });

  if (!currentUser?.id || isLoading || isFetching) {
    return (
      <div className="mt-4">
        <MainLoader />
      </div>
    );
  }

  if (isError) {
    return <strong className="mt-4 block text-center text-red-500">{t('error_load_trips')}</strong>;
  }

  const trips = data ?? [];

  if (trips.length === 0) {
    return (
      <strong className="mt-4 block text-center text-slate-500 dark:text-slate-400">{t('error_load_trips')}</strong>
    );
  }

  return (
    <div className="max-w-[960px]">
      <ul className="mt-4 space-y-6 tablet:space-y-8">
        {trips.map((trip) => (
          <li key={trip.myOrderId}>
            <TripCard item={trip} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CurrentTrips;
