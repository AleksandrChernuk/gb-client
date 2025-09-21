export const dynamic = 'force-dynamic';
export const revalidate = 0;

import TripsPage from '@/components/modules/profile/trips';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { getTranslations } from 'next-intl/server';

const Trips = async () => {
  const t = await getTranslations(MESSAGE_FILES.PROFILE);

  return (
    <>
      <h1 className="mb-8">{t('trips_hystori')}</h1>
      <TripsPage />
    </>
  );
};

export default Trips;
