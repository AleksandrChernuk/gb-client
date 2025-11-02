'use client';

import { useQueryState, createParser } from 'nuqs';
import { extractLocationDetails } from '@/shared/lib/extractLocationDetails';
import { ILocation } from '@/shared/types/location.types';
import { GroupedCitiesList } from './GroupedCitiesList';
import { groupCitiesByLetter } from '@/shared/lib/groupCitiesByLetter';

export const searchParser = createParser({
  parse: (value) => value ?? '',
  serialize: (value) => value || '',
});

type Props = {
  initialLocations: ILocation[];
  locale: string;
};

export function GroupedCitiesListClient({ initialLocations, locale }: Props) {
  const [search] = useQueryState('search', searchParser);

  const filtered = search
    ? initialLocations.filter((loc) =>
        extractLocationDetails(loc, locale).locationName.toLowerCase().includes(search.toLowerCase()),
      )
    : initialLocations;

  const grouped = groupCitiesByLetter(filtered, locale);

  return <GroupedCitiesList groups={grouped} locale={locale} />;
}
