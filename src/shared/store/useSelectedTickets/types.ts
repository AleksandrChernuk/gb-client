import { ILocation } from '@/shared/types/location.types';
import { IRouteResponse } from '@/shared/types/route.types';

type TselectedTicket = {
  route: IRouteResponse | null;
  voyagers: number;
  from: ILocation;
  to: ILocation;
};

export type selectedTicketsState = {
  isHydrated: boolean;
  selectedTicket: TselectedTicket;
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
  setSelectedTicket: (data: TselectedTicket) => void;
  setLoading: (loading: boolean) => void;
  resetSelectedTicket: () => void;
};

export type useSelectedTicketsStore = selectedTicketsState & SelectedTicketsActions;
