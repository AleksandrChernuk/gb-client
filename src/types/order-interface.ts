export interface ISeatOrder {
  seat_id?: number;
  seat_number?: number;
}

export interface IDiscountOrder {
  discount_id?: string;
  discount_description?: string;
  discount_percent?: number;
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

  toCityId: number;
  toCityName: string;

  fromStationId: string;
  fromStationName: string;
  fromStationLat?: number;
  fromStationLon?: number;

  toStationId: string;
  toStationName: string;
  toStationLat?: number;
  toStationLon?: number;

  departureDateTime: string;
  arrivalDateTime: string;

  platform?: string;
  busModel?: string;
  busNumber?: string;

  transferCity?: string;
  transferStation?: string;
  transferDeparture?: string;
  transferArrival?: string;

  carrierId?: string;
  carrierName?: string;
  carrierPhone?: string;

  insurerId?: string;
  insurerName?: string;
  insurerAddress?: string;
  insurerPhone?: string;

  tripType: 'ONEWAY';
  paymentType: 'BOOK' | 'PAYMENT_AT_BOARDING';
  currency: string;
  locale: string;

  userId?: string;
  customerFirstName: string;
  customerLastName: string;
  customerEmail: string;
  customerPhone: string;

  automaticDiscountId?: string;
  refundRules?: string[];
  baggageRules?: string[];
  tickets?: RequestTicket[];
}
