import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { getTranslations } from 'next-intl/server';
import CompletedTrips from './widgets/CompletedTrips';
import FutureTrips from './widgets/FutureTrips';

export default async function TripsPage() {
  const t = await getTranslations(MESSAGE_FILES.PROFILE);

  return (
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
  );
}
