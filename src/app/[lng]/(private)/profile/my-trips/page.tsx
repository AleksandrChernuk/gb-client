export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getTranslations } from 'next-intl/server';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import FutureTrips from '@/widgets/profile-future-trips-list';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import CompletedTrips from '@/widgets/profile-complete-trips-list';

const Trips = async () => {
  const t = await getTranslations(MESSAGE_FILES.PROFILE);

  return (
    <>
      <h1 className="mb-8">{t('trips_hystori')}</h1>
      <Tabs defaultValue="upcoming" className="w-full flex-1">
        <TabsList className="gap-4 h-fit">
          <TabsTrigger value="upcoming">{t('upcoming_trips')}</TabsTrigger>
          <TabsTrigger value="all">{t('all_trips')}</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <FutureTrips />
        </TabsContent>
        <TabsContent value="all">
          <CompletedTrips />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Trips;
