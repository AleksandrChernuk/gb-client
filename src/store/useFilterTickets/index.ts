import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { filterRoutesByCarriers, sortedCarriers, sortedRoutes } from './helpers';
import { FilterTicketsStore } from './types';
import { sortBuy } from '@/constans/sortbuylist.constans';

export const useFilterTickets = create<FilterTicketsStore>()(
  devtools(
    immer((set) => ({
      tickets: [],
      filteredTickets: [],
      carriers: [],
      filterCarriers: [],
      sortBy: sortBuy.SORT_BUY_PRICE_ASC,

      setTickets: (tickets) => {
        set((state) => {
          state.tickets = tickets;
          state.filteredTickets = sortedRoutes({
            sortBy: state.sortBy,
            data: tickets,
          });
          state.carriers = sortedCarriers({ data: tickets });
          state.filterCarriers = [];
        });
      },

      setSortByTickets: (sortBy) => {
        set((state) => {
          state.sortBy = sortBy;
          state.filteredTickets = sortedRoutes({
            sortBy,
            data: filterRoutesByCarriers(state.tickets, state.filterCarriers),
          });
        });
      },

      setFilterCarriers: (carrier) => {
        set((state) => {
          const updatedFilterCarriers = state.filterCarriers.includes(carrier)
            ? state.filterCarriers.filter((c) => c !== carrier)
            : [...state.filterCarriers, carrier];

          state.filterCarriers = updatedFilterCarriers;
          state.filteredTickets = sortedRoutes({
            sortBy: state.sortBy,
            data: filterRoutesByCarriers(state.tickets, updatedFilterCarriers),
          });
        });
      },

      resetFilters: () => {
        set((state) => {
          state.filterCarriers = [];
          state.sortBy = 'sort_buy_popularity';
          state.filteredTickets = sortedRoutes({
            sortBy: 'sort_buy_popularity',
            data: state.tickets,
          });
        });
      },

      resetSortByTickets: () => {
        set((state) => {
          state.sortBy = 'sort_buy_popularity';
          state.filteredTickets = sortedRoutes({
            sortBy: 'sort_buy_popularity',
            data: state.tickets,
          });
        });
      },

      resetAllFilters: () => {
        set((state) => {
          state.filterCarriers = [];
          state.sortBy = 'sort_buy_popularity';
          state.filteredTickets = sortedRoutes({
            sortBy: 'sort_buy_popularity',
            data: state.tickets,
          });
        });
      },
    })),
  ),
);
