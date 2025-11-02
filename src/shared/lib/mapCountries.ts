import { ILocation } from '@/shared/types/location.types';
import { extractCountryDetails } from '@/shared/lib/country';
import { slugify } from '@/shared/lib/slugify';

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

    const enName = country.translations.find((t) => t.language === 'en')?.countryName ?? countryName;

    const slug = slugify(enName).toLowerCase();

    if (!map.has(slug)) {
      map.set(slug, {
        slug,
        name: countryName,
        countryId: country.id,
      });
    }
  }

  return [...map.values()];
}
