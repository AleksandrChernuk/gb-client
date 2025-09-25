'use client';

import { Button } from '@/shared/ui/button';
import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useAllCountriesContext } from '@/features/all-countries/model/AllCountriesProvider';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { extractLocationDetails } from '@/shared/lib/extractLocationDetails';
import CardWrapper from '@/shared/ui/CardWrapper';

export default function CountriesList() {
  const { countrys, locations, selectCountry, selectedCountry } = useAllCountriesContext();
  const locale = useLocale();
  const t = useTranslations(MESSAGE_FILES.ALL_COUNTRIES);

  const selectedCountryName = selectedCountry ? extractLocationDetails(selectedCountry, locale).countryName : null;

  return (
    <CardWrapper className="dark:bg-slate-900 tablet:p-4">
      <ul className="flex items-center flex-wrap gap-4">
        <li key="all-countries">
          <Button
            variant="ghost"
            className={`px-2 py-1 rounded-sm ${selectedCountry === null ? 'bg-green-500 text-white' : ''}`}
            onClick={() => selectCountry(null)}
          >
            {t('all')}
          </Button>
        </li>

        {countrys.map((countryName) => {
          const location = locations.find((loc) => extractLocationDetails(loc, locale).countryName === countryName);

          if (!location) return null;

          const isActive = selectedCountryName === countryName;

          return (
            <li key={countryName}>
              <Button
                variant="ghost"
                className={`px-2 py-1 rounded-sm ${isActive ? 'bg-green-500 text-white' : ''}`}
                onClick={() => selectCountry(location)}
              >
                {countryName}
              </Button>
            </li>
          );
        })}
      </ul>
    </CardWrapper>
  );
}
