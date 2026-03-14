export const buildCountryHref = (locale: string, countryId: number): string => `/all-countries/${countryId}/`;

export const buildCityHref = (locale: string, countryId: number, cityId: number): string =>
  `/${locale}/all-countries/${countryId}/${cityId}/`;
