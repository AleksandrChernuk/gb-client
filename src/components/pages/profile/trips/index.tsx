import { MESSAGE_FILES } from '@/config/message.file.constans';
import { getTranslations } from 'next-intl/server';
import TripsList from './componets/TripsList';

export default async function TripsPage() {
  const t = await getTranslations(MESSAGE_FILES.PROFILE);

  return (
    <div>
      <h1 className="mb-4">{t('trips_hystori')}</h1>
      <TripsList />
    </div>
  );
}
