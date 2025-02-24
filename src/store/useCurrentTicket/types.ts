import { IRouteResponse } from '@/types/route.types';
 
export type CurrentTicketState = {
  сurrentTicket: IRouteResponse | null
  loadingDetails?: boolean
  isHydrated: boolean
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
  resetCurrentTicket: ( ) => void
}

export type CurrentTicketStore = CurrentTicketState & CurrentTicketActions
