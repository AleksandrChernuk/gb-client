import { TPaidBaggage } from '@/shared/types/paid.baggage.types';

export interface ISeatOrder {
  seatId?: number;
  seatNumber?: number;
}

export interface IDiscountOrder {
  discountId?: string;
  discountDescription?: string;
  discountPercent?: number;
}

export type RequestTicket = {
  firstName: string;
  lastName: string;
  middlename?: string;
  birthdate?: string;
  documentType?: number;
  documentNumber?: string;
  documentExpirationDate?: string;
  gender?: 'M' | 'F';
  citizenship?: string;
  phone: string;
  email: string;
  seatId?: string;
  seatNumber?: string;
  discountId?: string;
  discountDescription?: string;
  discountPercent?: number;
  withFees?: boolean;
  buggageCount?: number;
  paidBaggage?: TPaidBaggage[];
};

export interface IRequestOrder {
  providerId: string;
  routeId?: string;
  rideId?: string;
  tripId?: string;
  intervalId?: string;
  busId?: string;
  metadata?: unknown;
  routeName?: string;
  canPaymentToDriver: boolean;
  fromCityId: number;
  fromCityName: string;
  fromCountry: string;
  fromStationId: string;
  fromStationName: string;
  fromStationAddress?: string;
  fromStationLat?: number;
  fromStationLon?: number;
  fromTimezone: string;
  toCityId: number;
  toCityName: string;
  toCountry: string;
  toStationId: string;
  toStationName: string;
  toStationAddress?: string;
  toStationLat?: number;
  toStationLon?: number;
  toTimezone: string;
  departureDateTime: string;
  arrivalDateTime: string;
  platform?: string;
  busModel?: string;
  busNumber?: string;
  transfers?: ITransfer[];
  carrierId?: string;
  carrierName?: string;
  carrierPhone?: string;
  insurerId?: string;
  insurerName?: string;
  insurerAddress?: string;
  insurerPhone?: string;
  tripType: 'oneway';
  eTicket: boolean;
  orderType: 'BOOK' | 'PAYMENT_AT_BOARDING';
  currency: string;
  locale: string;
  userId?: string;
  customerFirstName?: string;
  customerLastName?: string;
  customerEmail: string;
  customerPhone: string;
  customerTimezone: string;
  automaticDiscountId?: string;
  refundRules?: string[];
  baggageRules?: string[];
  tickets?: RequestTicket[];
  timetableId?: string;
  bustypeId?: string;
  ticketChange?: boolean;
  refundOnlyOrder: boolean | null;
}

export interface ITransfer {
  transferCity: string;
  transferStation?: string;
  stopDuration?: string;
  arrivalDateTime: string;
}

export interface IOrderResponse {
  totalAmount: number;
  currency: string;
  providerId: string;
  orderId: string;
  locale: string;
  customerEmail: string;
}
