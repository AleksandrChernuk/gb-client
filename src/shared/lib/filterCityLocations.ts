import { ILocation } from '@/shared/types/location.types';
import { extractLocationDetails } from '@/shared/lib/extractLocationDetails';

export function filterCityLocations(locations: ILocation[], lng: string, slug: string, countryId?: number) {
  return locations.filter((loc) => {
    const locationName = extractLocationDetails(loc, lng).locationName.toLowerCase().trim();

    if (locationName.startsWith('незабаром') || locationName.startsWith('скоро') || locationName.startsWith('soon')) {
      return false;
    }

    if (countryId) {
      return loc.country.id === countryId;
    }

    const englishCountryName = extractLocationDetails(loc, 'en').countryName.toLowerCase().trim();

    return englishCountryName === slug.toLowerCase();
  });
}
