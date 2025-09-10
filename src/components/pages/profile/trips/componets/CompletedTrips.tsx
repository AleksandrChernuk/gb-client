'use client';

import { IUserCompletedTrips } from '@/types/profile.trips';
import { getCompletedTrips } from '@/actions/user.services.client';
import { useLocale, useTranslations } from 'next-intl';
import { useUserStore } from '@/store/useUser';
import { useQuery } from '@tanstack/react-query';
import { MainLoader } from '@/components/shared/MainLoader';
import { Container } from '@/components/shared/Container';
import { TripCard } from './TripCard';
import { MESSAGE_FILES } from '@/config/message.file.constans';

const CompletedTrips = () => {
  const locale = useLocale();
  const { currentUser } = useUserStore();
  const t = useTranslations(MESSAGE_FILES.PROFILE);

  const { data, isLoading, isFetching, isError } = useQuery<IUserCompletedTrips>({
    queryKey: ['completed-trips', currentUser?.id, locale, 1, 10],
    queryFn: () => getCompletedTrips({ userId: currentUser!.id, locale, page: 1, perPage: 10 }),
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

  const trips = data?.data ?? [];

  if (trips.length === 0) {
    return (
      <strong className="mt-4 block text-center text-slate-500 dark:text-slate-400">{t('error_load_trips')}</strong>
    );
  }

  return (
    <Container size="sm">
      <ul className="mt-4 space-y-6 tablet:space-y-8">
        {trips.map((trip) => (
          <li key={trip.myOrderId}>
            <TripCard item={trip} />
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default CompletedTrips;
