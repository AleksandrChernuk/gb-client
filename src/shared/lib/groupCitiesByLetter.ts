import { extractLocationDetails } from '@/shared/lib/extractLocationDetails';
import { ILocation } from '@/shared/types/location.types';

export function groupCitiesByLetter(filteredLocations: ILocation[], locale: string) {
  const map = new Map<string, ILocation[]>();

  filteredLocations.forEach((loc) => {
    const { locationName } = extractLocationDetails(loc, locale);
    const firstLetter = locationName?.charAt(0).toUpperCase();

    if (
      !locationName ||
      locationName.startsWith('Незабаром') ||
      locationName.startsWith('Скоро') ||
      locationName.startsWith('Soon')
    ) {
      return;
    }

    if (!firstLetter) return;

    if (!map.has(firstLetter)) {
      map.set(firstLetter, []);
    }
    map.get(firstLetter)!.push(loc);
  });

  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b, locale))
    .map(([letter, items]) => ({
      letter,
      items: items.sort((a, b) => {
        const aName = extractLocationDetails(a, locale).locationName;
        const bName = extractLocationDetails(b, locale).locationName;
        return aName.localeCompare(bName, locale);
      }),
    }));
}
