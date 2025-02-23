import { IRouteResponse } from '@/types/route.types';
import { ICarriers } from '@/types/carriers.types';

export type TsortBy =
  | 'sort_buy_price'
  | 'sort_buy_popularity'
  | 'sort_buy_arrival_time'
  | 'sort_buy_time_on_road'
  | 'sort_buy_departure_time';

export type FilterTicketsState = {
  tickets: IRouteResponse[]
  filteredTickets: IRouteResponse[]
  sortBy: TsortBy
  carriers: ICarriers[]
  filterCarriers: string[]
}

export type FilterTicketsActions = {
  setTickets: (tickets: IRouteResponse[]) => void
  setSortByTickets: (sortBy: TsortBy) => void
  resetSortByTickets: () => void
  resetFilters: () => void
  setFilterCarriers: (carrier: string) => void
}

export type FilterTicketsStore = FilterTicketsState & FilterTicketsActions
