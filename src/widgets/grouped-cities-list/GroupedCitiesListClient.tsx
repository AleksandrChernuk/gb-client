'use client';

import { useQueryState } from 'nuqs';
import { useMemo } from 'react';
import { extractLocationDetails } from '@/shared/lib/extractLocationDetails';
import { groupCitiesByLetter } from '@/shared/lib/groupCitiesByLetter';
import { ILocation } from '@/shared/types/location.types';
import GroupedCitiesList from './GroupedCitiesList';
import { searchParser } from '@/features/city-search/model/searchParser';

type Props = { initialLocations: ILocation[]; locale: string };

function GroupedCitiesListClient({ initialLocations, locale }: Props) {
  const [search] = useQueryState('search', searchParser);

  const grouped = useMemo(() => {
    const query = search.toLowerCase();
    const filtered = query
      ? initialLocations.filter((loc) => extractLocationDetails(loc, locale).locationName.toLowerCase().includes(query))
      : initialLocations;
    return groupCitiesByLetter(filtered, locale);
  }, [search, initialLocations, locale]);

  return <GroupedCitiesList groups={grouped} locale={locale} />;
}

export default GroupedCitiesListClient;
