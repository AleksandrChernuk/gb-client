import { IRouteResponse } from '@/types/route.types';

export type selectedTicketsState = {
  isHydrated: boolean;
  selectedTicket: IRouteResponse | null;
  loadingSelectTicket: boolean;
};

export type ReqTicketData = Partial<{
  route: IRouteResponse;
  locale: string;
  passCount: number;
  fromCityId: number;
  toCityId: number;
  travelDate: string;
}>;

export type SelectedTicketsActions = {
  setSelectedTicket: (data: ReqTicketData) => Promise<void>;
  resetSelectedTicket: () => void;
};

export type useSelectedTicketsStore = selectedTicketsState & SelectedTicketsActions;
