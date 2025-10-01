import { IRouteResponse, IGetRouteDetailsBody } from '@/shared/types/route.types';

export interface RouteDetailsParams {
  route: IRouteResponse;
  fromCityId: number;
  toCityId: number;
  locale: string;
  passCount: number;
  travelDate: string;
}

export function buildRouteDetailsRequest(params: RouteDetailsParams): IGetRouteDetailsBody {
  const { route, fromCityId, toCityId, locale, passCount, travelDate } = params;
  const { identificators, departure, arrival } = route;

  return {
    fromCityId,
    toCityId,
    fromStationId: String(departure.stationId),
    toStationId: String(arrival.stationId),
    providerId: identificators.providerId,
    travelDate,
    currency: route.ticketPricing.currency,
    locale,
    passengersCount: passCount,

    ...(identificators.routeId && { routeId: String(identificators.routeId) }),
    ...(identificators.routeNumber && { routeNumber: String(identificators.routeNumber) }),

    ...(identificators.intervalId && { intervalId: String(identificators.intervalId) }),
    ...(identificators.busId && { busId: String(identificators.busId) }),
    ...(identificators.metadata !== undefined && { metadata: identificators.metadata }),
    ...(identificators.timetableId && { timetableId: identificators.timetableId }),
    ...(identificators.bustypeId && { bustypeId: identificators.bustypeId }),

    ...(identificators.hasPlan && { hasPlan: Boolean(identificators.hasPlan) }),
    ...(identificators.requestGetFreeSeats && { requestGetFreeSeats: Boolean(identificators.requestGetFreeSeats) }),
    ...(identificators.requestGetDiscount && { requestGetDiscount: Boolean(identificators.requestGetDiscount) }),
    ...(identificators.requestGetBaggage && { requestGetBaggage: Boolean(identificators.requestGetBaggage) }),
  };
}
