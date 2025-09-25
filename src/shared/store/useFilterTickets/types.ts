import { IRouteResponse } from '@/shared/types/route.types';
import { ICarriers } from '@/shared/types/carriers.types';
import { TSortBuy } from '@/shared/constans/sortbuylist.constans';

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
