import { BASE_URL } from '@/shared/configs/constants';
import { ICountry } from '@/shared/types/countries.types';
import { Locale } from 'next-intl';

function getCountryName(country: ICountry, lng: Locale): string {
  const translation = country.translations.find((item) => item.language === lng) ?? country.translations[0];

  return translation?.countryFullName || translation?.countryName || country.slug;
}

export function buildCountryDirectorySchema(countries: ICountry[], lng: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${BASE_URL}/${lng}/all-countries/#country-directory`,
    name: 'GreenBus country directory',
    inLanguage: lng,
    numberOfItems: countries.length,
    itemListElement: countries.map((country, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: getCountryName(country, lng),
      url: `${BASE_URL}/${lng}/all-countries/${country.slug}/`,
    })),
  };
}
