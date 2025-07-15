import { IRouteResponse } from '@/types/route.types';

export type TicketsDetailsState = {
  isHydrated: boolean;
  ticketDetailsMap: Record<string, IRouteResponse>;
  loadingMap: Record<string, boolean>;
  curentDetailsId: null | string;
};

export type SetCurrentTicket = Partial<{
  route: IRouteResponse;
  locale: string;
  passCount: number;
  fromCityId: number;
  toCityId: number;
  travelDate: string;
}>;

export type TicketsDetailsActions = {
  setTicketsDetails: (ticket: SetCurrentTicket) => Promise<void>;
};

export type TicketsDetailsStore = TicketsDetailsState & TicketsDetailsActions;
