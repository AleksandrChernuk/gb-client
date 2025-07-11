import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { IRouteDetailsResponse } from '@/types/route.details.interface';
import { getRouteDetails } from '@/actions/route.actions';
import { IGetRouteDetailsBody, IRouteResponse } from '@/types/route.types';
import { CurrentTicketStore } from './types';
import { cleanObject } from './helpers';

export const useCurrentTicket = create<CurrentTicketStore>()(
  devtools(
    immer(
      persist(
        (set, get) => ({
          isHydrated: false,
          tickets: {},
          loadingTickets: {},
          selectedTicketId: null,
          selectedTicket: null,
          loadingSelectTicket: false,

          setSelectedTicketId(id) {
            set({ selectedTicketId: id });
          },

          getDetailsTicket: async ({ route, fromCityId, toCityId, locale, passCount, travelDate }) => {
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
                  state.tickets[route.ticket_id] = {} as IRouteResponse;
                  state.selectedTicketId = null;
                });
              }
              return;
            }

            const ticket_id = route.ticket_id;
            const tickets = get().tickets;
            if (tickets[ticket_id]?.details) {
              return;
            }

            let res: IRouteDetailsResponse | null = null;

            const blockedDetailsGet = ['EUROCLUB'];
            if (blockedDetailsGet.includes(route?.provider_name)) {
              set((state) => {
                state.tickets[route?.ticket_id] = route;
                state.selectedTicketId = route.identificators.route_id || null;
              });

              return;
            }

            set((state) => ({
              ...state,
              loadingTickets: { ...state.loadingTickets, [ticket_id]: true },
            }));
            try {
              const rawData = {
                routeId: route.identificators.route_id,
                intervalId: route.identificators.intervalId || '',
                // bus_id: route.provider_name === 'INFOBUS' ? undefined : route.identificators.bus_id,
                ...(route.provider_name !== 'INFOBUS' && route.identificators.bus_id
                  ? { bus_id: route.identificators.bus_id }
                  : {}),
                fromCityId,
                toCityId,
                fromStationId: route.departure.station_id,
                toStationId: route.arrival.station_id,
                providerId: route.identificators.provider_id,
                travelDate,
                currency: 'UAH',
                locale,
                passengersCount: passCount,
                metadata: route.identificators.metadata,
                timetable_id: route.identificators.timetable_id,
                bustype_id: route.identificators.bustype_id!,
                has_plan: route.identificators.has_plan,
                request_get_free_seats: route.identificators.request_get_free_seats,
                request_get_discount: route.identificators.request_get_discount,
                request_get_baggage: route.identificators.request_get_baggage,
              };

              res = await getRouteDetails(cleanObject(rawData) as IGetRouteDetailsBody);
            } catch (error) {
              console.error('Ошибка при получении данных маршрута:', error);
              set((state) => ({
                ...state,
                loadingTickets: { ...state.loadingTickets, [ticket_id]: false },
              }));
            } finally {
              set((state) => ({
                ...state,
                loadingTickets: { ...state.loadingTickets, [ticket_id]: false },
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
              tickets: { ...state.tickets, [ticket_id]: updatedRoute },
            }));
          },

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
                  state.selectedTicketId = null;
                });
              }
              return;
            }

            let res: IRouteDetailsResponse | null = null;

            const blockedDetailsGet = ['EUROCLUB'];
            if (blockedDetailsGet.includes(route?.provider_name)) {
              set((state) => {
                state.selectedTicket = route;
                state.selectedTicketId = route.ticket_id;
              });

              return;
            }

            try {
              set((state) => ({
                ...state,
                loadingSelectTicket: true,
              }));
              const rawData = {
                routeId: route.identificators.route_id,
                intervalId: route.identificators.intervalId || '',
                ...(route.provider_name !== 'INFOBUS' && route.identificators.bus_id
                  ? { bus_id: route.identificators.bus_id }
                  : {}),
                // bus_id: route.provider_name === 'INFOBUS' ? undefined : route.identificators.bus_id,
                fromCityId,
                toCityId,
                fromStationId: route.departure.station_id,
                toStationId: route.arrival.station_id,
                providerId: route.identificators.provider_id,
                travelDate,
                currency: 'UAH',
                locale,
                passengersCount: passCount,
                metadata: route.identificators.metadata,
                timetable_id: route.identificators.timetable_id,
                bustype_id: route.identificators.bustype_id!,
                has_plan: route.identificators.has_plan,
                request_get_free_seats: route.identificators.request_get_free_seats,
                request_get_discount: route.identificators.request_get_discount,
                request_get_baggage: route.identificators.request_get_baggage,
              };

              res = await getRouteDetails(cleanObject(rawData) as IGetRouteDetailsBody);
            } catch (error) {
              console.error('Ошибка при получении данных маршрута:', error);
              set((state) => ({
                ...state,
                loadingSelectTicket: false,
              }));
            } finally {
              set((state) => ({
                ...state,
                loadingSelectTicket: false,
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
              selectedTicket: updatedRoute,
              selectedTicketId: route.ticket_id,
            }));
          },

          resetCurrentTicket: async () => {
            set((state) => ({
              ...state,
              tickets: {},
              loadingTickets: {},
              selectedTicketId: null,
              selectedTicket: null,
              loadingSelectTicket: false,
            }));
          },
        }),
        {
          name: 'current-ticket',

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
