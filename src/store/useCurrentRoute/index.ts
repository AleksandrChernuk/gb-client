import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { CurrentRouteStore } from './types';
import { immer } from 'zustand/middleware/immer';
import { IRouteDetailsResponse } from '@/types/routeDetails-interface';
import { getRouteDetails } from '@/actions/route-actions';
import { IRouteResponse } from '@/types/route.types';

export const useCurrentRouteStore = create<CurrentRouteStore>()(
  devtools(
    immer(
      persist(
        (set) => ({
          сurrentRoute: null,
          isHydrated: false,
          setCurrentRoute: async ({
            route,
            fromCityId,
            toCityId,
            locale,
            passCount,
            travelDate,
          }) => {
            if (
              !route ||
              typeof fromCityId !== 'number' ||
              typeof toCityId !== 'number' ||
              !passCount ||
              !locale ||
              !travelDate
            ) {
              set({ сurrentRoute: null })
              return
            }

            let res: IRouteDetailsResponse | null = null
            set({ loadingDetails: true })

            try {
              res = await getRouteDetails({
                routeId: route.identificators.route_id,
                intervalId: route.identificators.intervalId || '',
                fromCityId: fromCityId,
                toCityId: toCityId,
                fromStationId: route.departure.station_id || 1,
                toStationId: route.arrival.station_id || 1,
                providerId: route.identificators.provider_id,
                travelDate: travelDate,
                locale: locale,
                passengersCount: passCount,
                metadata: route.identificators.metadata,
              })
            } catch (error) {
              console.error('Ошибка при получении данных маршрута:', error)
              set({ loadingDetails: false })
            } finally {
              set({ loadingDetails: false })
            }

            const currentDetails: IRouteDetailsResponse =
              route.details || ({} as IRouteDetailsResponse)

            const updatedDetails = {
              ...currentDetails,
              ...Object.fromEntries(
                Object.entries(res || {}).map(([key, value]) => [
                  key,
                  value !== null ? value : currentDetails[key as keyof IRouteDetailsResponse],
                ])
              ),
            } as IRouteDetailsResponse

            const updatedRoute: IRouteResponse = {
              ...route,
              details: updatedDetails,
            }

            set({ сurrentRoute: updatedRoute })
          },
        }),
        {
          name: 'current-route',
          onRehydrateStorage: () => (state) => {
            if (state) {
              state.isHydrated = true
            }
          },
        }
      )
    )
  )
)
