'use client';

import CardWrapper from '@/components/shared/CardWrapper';
import { Button } from '@/components/ui/button';

import React from 'react';
import { useAllCountriesContext } from '../context';
import { extractLocationDetails } from '@/lib/extractLocationDetails';
import { useLocale } from 'next-intl';

export default function CountriesList() {
  const { countrys, locations, selectCountry } = useAllCountriesContext();
  const locale = useLocale();

  return (
    <CardWrapper className="dark:bg-slate-900">
      <ul className="flex items-center flex-wrap gap-4">
        {countrys.map((countryName) => {
          const location = locations.find((loc) => extractLocationDetails(loc, locale).countryName === countryName);
          if (!location) return null;

          return (
            <li key={countryName}>
              <Button variant="ghost" className="px-2 py-1" onClick={() => selectCountry(location)}>
                {countryName}
              </Button>
            </li>
          );
        })}
      </ul>
    </CardWrapper>
  );
}
