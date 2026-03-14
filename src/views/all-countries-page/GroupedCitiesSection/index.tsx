import { Container } from '@/shared/ui/Container';
import GroupedCitiesListClient from '@/widgets/grouped-cities-list/GroupedCitiesListClient';
import type { ILocation } from '@/shared/types/location.types';

type Props = { locations: ILocation[]; locale: string };

export function GroupedCitiesSection({ locations, locale }: Props) {
  return (
    <section className="py-4 laptop:py-8">
      <Container size="m">
        <GroupedCitiesListClient initialLocations={locations} locale={locale} />
      </Container>
    </section>
  );
}
