import { IRouteResponse } from '@/types/route.types';

export type CurrentTicketState = {
  isHydrated: boolean;
  selectedTicketId: string | null;
  tickets: Record<string, IRouteResponse>;
  selectedTicket: IRouteResponse | null;
  loadingTickets: Record<string, boolean>;
  isButtonDisabled: boolean;
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
  getDetailsTicket: (ticket: SetCurrentTicket) => void;
  setSelectedTicket: (ticket: SetCurrentTicket) => void;
  setSelectedTicketId: (id: string | null) => void;
  resetCurrentTicket: () => void;
  SetIsButtonDisabled: () => void;
};

export type CurrentTicketStore = CurrentTicketState & CurrentTicketActions;
