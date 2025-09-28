import { IRouteDetailsResponse, IRouteResponse } from '@/shared/types/route.types';

/**
 * Обновляет детали маршрута:
 * - сохраняет уже имеющиеся значения details
 * - добавляет недостающие поля из res
 */

export function updateRouteDetails(route: IRouteResponse, res?: Partial<IRouteDetailsResponse> | null): IRouteResponse {
  const currentDetails: IRouteDetailsResponse = route.details || ({} as IRouteDetailsResponse);

  const updatedDetails: IRouteDetailsResponse = {
    ...currentDetails,
    ...Object.fromEntries(
      Object.entries(res || {}).map(([key, value]) => [
        key,
        currentDetails[key as keyof IRouteDetailsResponse] ?? value,
      ]),
    ),
  };

  const updatedRoute: IRouteResponse = {
    ...route,
    details: updatedDetails,
  };

  return updatedRoute;
}
