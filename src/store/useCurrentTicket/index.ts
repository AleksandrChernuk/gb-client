import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { IRouteDetailsResponse } from '@/types/routeDetails-interface'
import { getRouteDetails } from '@/actions/route-actions'
import { IRouteResponse } from '@/types/route.types'
import { CurrentTicketStore } from './types'
import { DeleteCookie } from '@/actions/delete-cookie'

export const useCurrentTicketStore = create<CurrentTicketStore>()(
  devtools(
    immer(
      persist(
        (set) => ({
          сurrentTicket: null,
          isHydrated: false,
          loadingDetails: false,
          setCurrentTicket: async ({
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
              set({ сurrentTicket: null })
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

            set({ сurrentTicket: updatedRoute })
          },
          resetCurrentTicket:  async()=> {
            set({ сurrentTicket: null })
            await DeleteCookie('_p')
          },
        }),
        {
          name: 'current-ticket',
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
