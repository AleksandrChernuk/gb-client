import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { filterRoutesByCarriers, sortedCarriers, sortedRoutes } from './helpers'
import { immer } from 'zustand/middleware/immer'
import { FilterTicketsStore } from './types'

export const useFilterTicketsStore = create<FilterTicketsStore>()(
  devtools(
    immer((set) => ({
      tickets: [],
      filteredTickets: [],
      carriers: [],
      filterCarriers: [],
      sortBy: 'sort_buy_popularity',

      setTickets: (tickets) => {
        set((state) => {
          state.tickets = sortedRoutes({ sortBy: state.sortBy, data: tickets })
          state.filteredTickets = sortedRoutes({ sortBy: state.sortBy, data: tickets })
          state.carriers = sortedCarriers({ data: tickets })
        })
      },

      setSortByTickets: (sortBy) => {
        set((state) => {
          state.sortBy = sortBy
          state.filteredTickets = sortedRoutes({
            sortBy,
            data: filterRoutesByCarriers(state.tickets, state.filterCarriers),
          })
        })
      },

      setFilterCarriers: (carrier) => {
        set((state) => {
          const updatedFilterCarriers = state.filterCarriers.includes(carrier)
            ? state.filterCarriers.filter((c) => c !== carrier)
            : [...state.filterCarriers, carrier]

          state.filterCarriers = updatedFilterCarriers

          state.filteredTickets = filterRoutesByCarriers(
            sortedRoutes({ sortBy: state.sortBy, data: state.tickets }),
            updatedFilterCarriers
          )
        })
      },

      resetFilters: () => {
        set((state) => {
          state.filterCarriers = []
          state.sortBy = 'sort_buy_popularity'
          state.filteredTickets = sortedRoutes({
            sortBy: 'sort_buy_popularity',
            data: state.tickets,
          })
        })
      },

      resetSortByTickets: () => {
        set((state) => {
          state.sortBy = 'sort_buy_popularity'
          state.filteredTickets = sortedRoutes({
            sortBy: 'sort_buy_popularity',
            data: state.tickets,
          })
        })
      },
    }))
  )
)
