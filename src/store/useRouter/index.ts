import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { filterRoutesByCarriers, sortedCarriers, sortedRoutes } from './helpers';
import { RoutesStore } from './types';

export const useRoutesStore = create<RoutesStore>()(
  devtools((set, get) => ({
    routes: [],
    filteredRoutes: [],
    carriers: [],
    sortCarriers: [],
    sortBy: 'sort_buy_popularity',

    setRoutes: (routes) => {
      const { sortBy, sortCarriers } = get();

      const filteredRoutes = filterRoutesByCarriers(routes, sortCarriers);

      set({
        routes: sortedRoutes({ sortBy, data: routes }),
        filteredRoutes: sortedRoutes({ sortBy, data: filteredRoutes }),
        carriers: sortedCarriers({ data: routes }),
      });
    },

    setSortBy: (sortBy) => {
      const { filteredRoutes } = get();
      set({
        sortBy,
        filteredRoutes: sortedRoutes({ sortBy, data: filteredRoutes }),
      });
    },

    resetSortBy: () => {
      const { routes } = get();
      set({
        sortCarriers: [],
        sortBy: 'sort_buy_popularity',
        filteredRoutes: sortedRoutes({
          sortBy: 'sort_buy_popularity',
          data: routes,
        }),
      });
    },

    setSortCarriers: (carrier) => {
      const { sortCarriers, routes, sortBy } = get();

      const updatedSortCarriers = sortCarriers.includes(carrier)
        ? sortCarriers.filter((c) => c !== carrier)
        : [...sortCarriers, carrier];

      const filteredRoutes = filterRoutesByCarriers(routes, updatedSortCarriers);

      set({
        sortCarriers: updatedSortCarriers,
        filteredRoutes: sortedRoutes({ sortBy, data: filteredRoutes }),
      });
    },
  }))
);
