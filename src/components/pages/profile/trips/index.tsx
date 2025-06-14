import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { getTranslations } from 'next-intl/server';
import LogOutBtn from '../settings/components/LogOutBtn';
import TripsList from './componets/TripsList';

export default async function TripsPage() {
  const t = await getTranslations(MESSAGE_FILES.PROFILE);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="mb-4">{t('trips_hystori')}</h1> <LogOutBtn />
      </div>
      <TripsList />
    </div>
  );
}
