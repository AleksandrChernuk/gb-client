import { IRouteResponse } from '@/types/route.types';

export type CurrentTicketState = {
  isHydrated: boolean;
  selectedTicketId: string | null;
  tickets: Record<string, IRouteResponse>;
  selectedTicket: IRouteResponse | null;
  loadingSelectTicket: boolean;
  loadingTickets: Record<string, boolean>;
};

export type SetCurrentTicket = Partial<{
  route: IRouteResponse;
  locale: string;
  passCount: number;
  fromCityId: number;
  toCityId: number;
  travelDate: string;
}>;

export type CurrentTicketActions = {
  getDetailsTicket: (ticket: SetCurrentTicket) => Promise<void>;
  setSelectedTicket: (ticket: SetCurrentTicket) => Promise<void>;
  setSelectedTicketId: (id: string | null) => void;
  resetCurrentTicket: () => void;
};

export type CurrentTicketStore = CurrentTicketState & CurrentTicketActions;
