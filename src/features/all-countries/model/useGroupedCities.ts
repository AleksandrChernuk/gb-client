import { useMemo, useState, useEffect } from 'react';
import { ILocation } from '@/shared/types/location.types';
import { extractLocationDetails } from '@/shared/lib/extractLocationDetails';

export const useGroupedCities = (locations: ILocation[], locale: string, selectedCountry: ILocation | null) => {
  const [activeLetter, setActiveLetter] = useState('All');

  const filteredLocations = useMemo(() => {
    if (!selectedCountry) return locations;
    const { countryName } = extractLocationDetails(selectedCountry, locale);
    return locations.filter((loc) => extractLocationDetails(loc, locale).countryName === countryName);
  }, [locations, selectedCountry, locale]);

  useEffect(() => {
    setActiveLetter('All');
  }, [selectedCountry]);

  const groupedCities = useMemo(() => {
    const map = new Map<string, ILocation[]>();

    filteredLocations.forEach((loc) => {
      const { locationName } = extractLocationDetails(loc, locale);
      const firstLetter = locationName?.charAt(0).toUpperCase();
      if (!firstLetter) return;
      if (!map.has(firstLetter)) map.set(firstLetter, []);
      map.get(firstLetter)!.push(loc);
    });

    return Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([letter, items]) => ({
        letter,
        items: items.sort((a, b) =>
          extractLocationDetails(a, locale).locationName.localeCompare(extractLocationDetails(b, locale).locationName),
        ),
      }));
  }, [filteredLocations, locale]);

  const letters = ['All', ...groupedCities.map((g) => g.letter)];
  const visibleGroups = activeLetter === 'All' ? groupedCities : groupedCities.filter((g) => g.letter === activeLetter);

  return { letters, visibleGroups, activeLetter, setActiveLetter };
};
