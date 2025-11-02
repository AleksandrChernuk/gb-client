'use client';

import { useQueryState, createParser } from 'nuqs';
import { extractLocationDetails } from '@/shared/lib/extractLocationDetails';
import { ILocation } from '@/shared/types/location.types';
import { groupCitiesByLetter } from '@/shared/lib/groupCitiesByLetter';
import GroupedCitiesList from '@/features/all-countries/GroupedCitiesList';

export const searchParser = createParser({
  parse: (value) => value ?? '',
  serialize: (value) => value || '',
});

type Props = {
  initialLocations: ILocation[];
  locale: string;
};

function GroupedCitiesListClient({ initialLocations, locale }: Props) {
  const [search] = useQueryState('search', searchParser);

  const filtered = search
    ? initialLocations.filter((loc) =>
        extractLocationDetails(loc, locale).locationName.toLowerCase().includes(search.toLowerCase()),
      )
    : initialLocations;

  const grouped = groupCitiesByLetter(filtered, locale);

  return <GroupedCitiesList groups={grouped} locale={locale} />;
}

export default GroupedCitiesListClient;
