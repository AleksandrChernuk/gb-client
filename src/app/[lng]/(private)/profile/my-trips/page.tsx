import TripsPage from '@/components/pages/profile/trips';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { getTranslations } from 'next-intl/server';

const Trips = async () => {
  const t = await getTranslations(MESSAGE_FILES.PROFILE);

  return (
    <div>
      <h1 className="mb-8">{t('trips_hystori')}</h1>
      <TripsPage />
    </div>
  );
};

export default Trips;
