import { IRouteResponse } from '@/types/route.types';
import { ICarriers } from '@/types/carriers.types';
import { TSortBuy } from '@/constans/sortbuylist.constans';

export type FilterTicketsState = {
  tickets: IRouteResponse[];
  filteredTickets: IRouteResponse[];
  sortBy: TSortBuy;
  carriers: ICarriers[];
  filterCarriers: string[];
};

export type FilterTicketsActions = {
  setTickets: (tickets: IRouteResponse[]) => void;
  setSortByTickets: (sortBy: TSortBuy) => void;
  resetSortByTickets: () => void;
  resetFilters: () => void;
  setFilterCarriers: (carrier: string) => void;
};

export type FilterTicketsStore = FilterTicketsState & FilterTicketsActions;
