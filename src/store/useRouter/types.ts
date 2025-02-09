import { IRouteResponse } from '@/types/route.types';
import { ICarriers } from '@/types/carriers.types';

export type TsortBy =
  | 'sort_buy_price'
  | 'sort_buy_popularity'
  | 'sort_buy_arrival_time'
  | 'sort_buy_time_on_road'
  | 'sort_buy_departure_time';

export type RoutesState = {
  routes: IRouteResponse[];
  filteredRoutes: IRouteResponse[];
  sortBy: TsortBy;
  carriers: ICarriers[];
  sortCarriers: string[];
};

export type RoutesActions = {
  setRoutes: (routes: IRouteResponse[]) => void;
  setSortBy: (sortBy: TsortBy) => void;
  resetSortBy: () => void;
  setSortCarriers: (carrier: string) => void;
};

export type RoutesStore = RoutesState & RoutesActions;
