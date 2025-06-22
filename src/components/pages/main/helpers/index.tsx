import { ILocation } from '@/types/location.types';

export function buildRoutes(locations?: ILocation[]) {
  if (!locations) {
    return [];
  }
  const fromUA = locations.filter((loc) => loc.country.code === 'UA');
  const toNotUA = locations.filter((loc) => loc.country.code !== 'UA');

  const minLength = Math.min(fromUA.length, toNotUA.length);
  const evenLength = minLength % 2 === 0 ? minLength : minLength - 1;

  const routes: { from: ILocation; to: ILocation }[] = [];

  for (let i = 0; i < evenLength; i++) {
    routes.push({ from: fromUA[i], to: toNotUA[i] });
  }

  return routes;
}
