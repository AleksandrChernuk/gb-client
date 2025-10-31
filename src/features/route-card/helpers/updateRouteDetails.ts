import { IRouteDetailsResponse, IRouteResponse } from '@/shared/types/route.types';

export function updateRouteDetails(route: IRouteResponse, res?: Partial<IRouteDetailsResponse> | null): IRouteResponse {
  const currentDetails: IRouteDetailsResponse = route.details || ({} as IRouteDetailsResponse);

  const updatedDetails: IRouteDetailsResponse = {
    ...currentDetails,
    ...Object.fromEntries(
      Object.entries(res || {}).map(([key, value]) => [
        key,
        // Якщо value === null і є поточне значення - залишаємо поточне
        // Інакше - використовуємо нове значення
        value === null && currentDetails[key as keyof IRouteDetailsResponse] !== undefined
          ? currentDetails[key as keyof IRouteDetailsResponse]
          : value,
      ]),
    ),
  };

  const updatedRoute: IRouteResponse = {
    ...route,
    details: updatedDetails,
  };

  return updatedRoute;
}
