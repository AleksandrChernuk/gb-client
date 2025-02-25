import { IRouteResponse } from '@/types/route.types';
 
export type CurrentTicketState = {
  сurrentTicket: IRouteResponse | null
  loadingDetails?: boolean
  isHydrated: boolean
  selectedTicketId: null | string
}

export type SetCurrentTicket = {
  route: IRouteResponse | null;
  locale?: string;
  passCount?: number;
  fromCityId?: number;
  toCityId?: number;
  travelDate?: string;
};

export type CurrentTicketActions = {
  setCurrentTicket: ({ route, locale, passCount, fromCityId, toCityId }: SetCurrentTicket) => void
  setSelectedTicketId: (id: string | null) => void
  resetCurrentTicket: () => void
}

export type CurrentTicketStore = CurrentTicketState & CurrentTicketActions
