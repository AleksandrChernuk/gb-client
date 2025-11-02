import { ILocation } from '@/shared/types/location.types';
import { extractCountryDetails } from '@/shared/lib/country';
import slugify from 'slugify';

export interface ICountryListItem {
  slug: string;
  name: string;
  countryId: number;
}

export function mapCountries(locations: ILocation[], locale: string): ICountryListItem[] {
  const map = new Map<string, ICountryListItem>();

  for (const loc of locations) {
    const country = loc.country;
    const { countryName } = extractCountryDetails(country, locale);

    if (
      !countryName ||
      countryName.startsWith('Незабаром') ||
      countryName.startsWith('Скоро') ||
      countryName.startsWith('Soon')
    ) {
      continue;
    }

    const enName = country.translations.find((t) => t.language === 'en')?.countryName ?? countryName;

    const safeSlug = slugify(enName, {
      lower: true,
      strict: true,
      locale: 'en',
    });

    if (!map.has(safeSlug)) {
      map.set(safeSlug, {
        slug: safeSlug,
        name: countryName,
        countryId: country.id,
      });
    }
  }

  return [...map.values()];
}
