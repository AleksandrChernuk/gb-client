'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useAllCountriesContext } from '../context';
import { ILocation } from '@/types/location.types';
import { extractLocationDetails } from '@/lib/extractLocationDetails';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import CardWrapper from '@/components/shared/CardWrapper';
import { MESSAGE_FILES } from '@/config/message.file.constans';

export default function CityList() {
  const { locations, selectedCountry } = useAllCountriesContext();
  const locale = useLocale();
  const [activeLetter, setActiveLetter] = useState<string>('All');
  const t = useTranslations(MESSAGE_FILES.ALL_COUNTRIES);

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

      if (!map.has(firstLetter)) {
        map.set(firstLetter, []);
      }
      map.get(firstLetter)!.push(loc);
    });

    return Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([letter, items]) => ({
        letter,
        items: items.sort((a, b) => {
          const aName = extractLocationDetails(a, locale).locationName;
          const bName = extractLocationDetails(b, locale).locationName;
          return aName.localeCompare(bName);
        }),
      }));
  }, [filteredLocations, locale]);

  const letters = ['All', ...groupedCities.map((g) => g.letter)];
  const visibleGroups = activeLetter === 'All' ? groupedCities : groupedCities.filter((g) => g.letter === activeLetter);

  return (
    <div>
      <ul className="flex flex-wrap gap-2 mb-4">
        {letters.map((letter) => (
          <li key={letter}>
            <Button
              onClick={() => setActiveLetter(letter)}
              variant={'outline'}
              className={`px-2 py-1 rounded-md ${
                activeLetter === letter
                  ? 'bg-green-500 text-white'
                  : 'bg-white dark:bg-slate-800 text-black dark:text-white'
              }`}
            >
              {letter === 'All' ? t('all') : letter}
            </Button>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-6">
        {visibleGroups.map(({ letter, items }) => (
          <CardWrapper key={letter} className="dark:bg-slate-900 tablet:p-4">
            <div className="px-2 rounded-md bg-green-500 flex items-center justify-center w-fit mb-4">
              <h3 className="text-white text-lg font-medium">{letter}</h3>
            </div>

            <ul className="flex gap-4 flex-wrap">
              {items.map((loc) => {
                const { locationName } = extractLocationDetails(loc, locale);
                return (
                  <li key={loc.id}>
                    <Button variant={'outline'} className="px-2 py-1 rounded-md">
                      {locationName}
                    </Button>
                  </li>
                );
              })}
            </ul>
          </CardWrapper>
        ))}
      </div>
    </div>
  );
}
