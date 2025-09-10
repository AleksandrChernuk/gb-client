import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { getTranslations } from 'next-intl/server';
import CurrentTrips from './componets/CurrentTrips';
import CompletedTrips from './componets/CompletedTrips';

export default async function TripsPage() {
  const t = await getTranslations(MESSAGE_FILES.PROFILE);

  return (
    <Tabs defaultValue="upcoming" className="w-full ">
      <TabsList className="gap-4">
        <TabsTrigger value="upcoming">{t('upcoming_trips')}</TabsTrigger>
        <TabsTrigger value="all">{t('all_trips')}</TabsTrigger>
      </TabsList>
      <TabsContent value="upcoming">
        <CurrentTrips />
      </TabsContent>
      <TabsContent value="all">
        <CompletedTrips />
      </TabsContent>
    </Tabs>
  );
}
