import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { getRouteDetails } from '@/actions/route.actions';
import { IGetRouteDetailsBody, IRouteDetailsResponse, IRouteResponse } from '@/types/route.types';
import { TicketsDetailsStore } from './types';

export const useTicketsDetails = create<TicketsDetailsStore>()(
  devtools(
    immer((set, get) => ({
      isHydrated: false,
      ticketDetailsMap: {},
      loadingMap: {},
      curentDetailsId: null,
      setTicketsDetails: async ({ route, fromCityId, toCityId, locale, passCount, travelDate }) => {
        if (
          !route ||
          typeof fromCityId !== 'number' ||
          typeof toCityId !== 'number' ||
          !passCount ||
          !locale ||
          !travelDate
        ) {
          if (route?.ticketId) {
            set((state) => {
              state.ticketDetailsMap[route.ticketId] = {} as IRouteResponse;
              state.curentDetailsId = null;
            });
          }
          return;
        }
        const ticketId = route.ticketId;
        const tickets = get().ticketDetailsMap;

        if (tickets[ticketId]?.details) {
          return;
        }

        let res: IRouteDetailsResponse | null = null;

        const blockedDetailsGet = ['EUROCLUB'];

        if (blockedDetailsGet.includes(route?.providerName)) {
          set((state) => {
            state.ticketDetailsMap[route?.ticketId] = route;
            state.curentDetailsId = route.identificators.routeId || null;
          });

          return;
        }

        set((state) => ({
          loadingMap: {
            ...state.loadingMap,
            [ticketId]: true,
          },
        }));

        try {
          const rawData = {
            ...(!!route.identificators.routeId ? { routeId: `${route.identificators.routeId}` } : {}),
            intervalId: route.identificators.intervalId || '',
            ...(!!route.identificators.busId ? { busId: route.identificators.busId } : {}),
            fromCityId,
            toCityId,
            fromStationId: `${route.departure.stationId}`,
            toStationId: `${route.arrival.stationId}`,
            providerId: route.identificators.providerId,
            travelDate,
            currency: 'UAH',
            locale,
            passengersCount: passCount,
            ...(!!route.identificators.metadata ? { metadata: route.identificators.metadata } : {}),
            ...(!!route.identificators.timetableId ? { timetableId: route.identificators.timetableId } : {}),
            ...(!!route.identificators.bustypeId ? { bustypeId: route.identificators.bustypeId } : {}),
            ...(!!route.identificators.hasPlan ? { has_plan: route.identificators.hasPlan } : {}),
            ...(!!route.identificators.requestGetFreeSeats
              ? { request_get_free_seats: route.identificators.requestGetFreeSeats }
              : {}),
            ...(!!route.identificators.requestGetDiscount
              ? { request_get_discount: route.identificators.requestGetDiscount }
              : {}),
            ...(!!route.identificators.requestGetBaggage
              ? { request_get_baggage: route.identificators.requestGetBaggage }
              : {}),
          };

          res = await getRouteDetails(rawData as IGetRouteDetailsBody);
        } catch (error) {
          console.error('Ошибка при получении данных маршрута:', error);
          set((state) => ({
            ...state,
            loadingMap: { ...state.loadingMap, [ticketId]: false },
          }));
        } finally {
          set((state) => ({
            ...state,
            loadingMap: { ...state.loadingMap, [ticketId]: false },
          }));
        }

        const currentDetails: IRouteDetailsResponse = route.details || ({} as IRouteDetailsResponse);

        const updatedDetails = {
          ...currentDetails,
          ...Object.fromEntries(
            Object.entries(res || {}).map(([key, value]) => [
              key,
              value !== null ? value : currentDetails[key as keyof IRouteDetailsResponse],
            ]),
          ),
        } as IRouteDetailsResponse;

        const updatedRoute: IRouteResponse = {
          ...route,
          details: updatedDetails,
        };

        set((state) => ({
          ...state,
          ticketDetailsMap: { ...state.ticketDetailsMap, [ticketId]: updatedRoute },
        }));
      },
    })),
  ),
);
