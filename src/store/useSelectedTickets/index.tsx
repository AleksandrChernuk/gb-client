import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { IRouteDetailsResponse } from '@/types/route.details.interface';
import { getRouteDetails } from '@/actions/route.actions';
import { IGetRouteDetailsBody, IRouteResponse } from '@/types/route.types';
import { useSelectedTicketsStore } from './types';

export const useSelectedTickets = create<useSelectedTicketsStore>()(
  devtools(
    immer(
      persist(
        (set) => ({
          isHydrated: false,
          selectedTicket: null,
          loadingSelectTicket: false,

          setSelectedTicket: async ({ route, fromCityId, toCityId, locale, passCount, travelDate }) => {
            if (
              !route ||
              typeof fromCityId !== 'number' ||
              typeof toCityId !== 'number' ||
              !passCount ||
              !locale ||
              !travelDate
            ) {
              if (route?.ticket_id) {
                set((state) => {
                  state.selectedTicket = null;
                });
              }
              return;
            }

            let res: IRouteDetailsResponse | null = null;

            const blockedDetailsGet = ['EUROCLUB'];
            if (blockedDetailsGet.includes(route?.provider_name)) {
              set((state) => {
                state.selectedTicket = route;
              });

              return;
            }

            try {
              set((state) => {
                state.loadingSelectTicket = true;
              });

              const rawData = {
                ...(!!route.identificators.route_id ? { routeId: `${route.identificators.route_id}` } : {}),
                intervalId: route.identificators.intervalId || '',
                ...(!!route.identificators.bus_id ? { bus_id: route.identificators.bus_id } : {}),
                fromCityId,
                toCityId,
                fromStationId: `${route.departure.station_id}`,
                toStationId: `${route.arrival.station_id}`,
                providerId: route.identificators.provider_id,
                travelDate,
                currency: 'UAH',
                locale,
                passengersCount: passCount,
                ...(!!route.identificators.metadata ? { metadata: route.identificators.metadata } : {}),
                ...(!!route.identificators.timetable_id ? { timetable_id: route.identificators.timetable_id } : {}),
                ...(!!route.identificators.bustype_id ? { bustype_id: route.identificators.bustype_id } : {}),
                ...(!!route.identificators.has_plan ? { has_plan: route.identificators.has_plan } : {}),
                ...(!!route.identificators.request_get_free_seats
                  ? { request_get_free_seats: route.identificators.request_get_free_seats }
                  : {}),
                ...(!!route.identificators.request_get_discount
                  ? { request_get_discount: route.identificators.request_get_discount }
                  : {}),
                ...(!!route.identificators.request_get_baggage
                  ? { request_get_baggage: route.identificators.request_get_baggage }
                  : {}),
              };

              res = await getRouteDetails(rawData as IGetRouteDetailsBody);

              console.log('res', res);
            } catch (error) {
              console.error('Ошибка при получении данных маршрута:', error);
            } finally {
              set((state) => {
                state.loadingSelectTicket = false;
              });
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
              selectedTicket: updatedRoute,
            }));
          },

          resetSelectedTicket: async () => {
            set((state) => ({
              ...state,
              selectedTicket: null,
              loadingSelectTicket: false,
            }));
          },
        }),
        {
          name: 'selected-tickets',
          storage: createJSONStorage(() => sessionStorage),
          onRehydrateStorage: () => (state) => {
            if (state) {
              state.isHydrated = true;
            }
          },
        },
      ),
    ),
  ),
);
