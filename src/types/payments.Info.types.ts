export type UserCustomerType = {
  customerId: string;
  firstName: string;
  lastName: string;
  middleName?: string | null;
  birthdate?: string | null;
  email: string;
  phone: string;
};

export type UserRefundType = {
  refundId: string;
  myOrderId: string;
  myOrderNumber: string;
  departureDateTime: string;
  fromCityName: string;
  fromCountry: string;
  toCityName: string;
  toCountry: string;
  refundAmount: string;
  currency: string;
  refundProvider: string;
  updatedAt: string;
};

export type UserPaymentType = {
  paymentId: string;
  paymentAmount: string;
  currency: string;
  paymentProvider: string;
  myOrderId: string;
  myOrderNumber: string;
  departureDateTime: string;
  fromCityName: string;
  fromCountry: string;
  toCityName: string;
  toCountry: string;
  updatedAt: string;
  refunds: UserRefundType[];
};

export interface IUserPaymentsData {
  customer: UserCustomerType;
  payments: UserPaymentType[];
}

export interface IUserPaymentsResponse {
  data: IUserPaymentsData;
  pagination: {
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
  };
}

export type TicketType = {
  ticketId: string;
  ticketNumber: number;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  middlename?: string | null;
  birthdate?: string | null;
  documentType?: number | null;
  documentNumber?: string | null;
  documentExpirationDate?: string | null;
  gender?: 'M' | 'F' | null;
  citizenship?: string | null;
  seatNumber?: string | null;
  ticketPrice?: string | null;
  ticketType?: 'FULL' | 'DISCOUNT' | null;
  discountPercent?: number | null;
  discountDescription?: string | null;
  ticketLink?: string | null;
  refundDate?: Date | null;
  refundPercent?: number | null;
  refundAmount?: string | null;
  refundDescription?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type TransferOrderType = {
  transferCity: string;
  transferStation?: string;
  stopDuration?: string;
};

export type UserOrdersType = {
  orderId: string;
  orderNumber: string;
  totalPrice?: string | null;
  currency: string;
  tripType: 'oneway' | 'twoway';
  eTicket: boolean;
  orderLink?: string | null;
  orderType: 'BOOK' | 'PAYMENT_AT_BOARDING' | 'RESERVE';
  paymentDate?: string | null;
  reserveExpiresAt?: string | null;
  refundDate?: Date | null;
  totalRefundAmount?: string | null;
  routeName?: string | null;
  departureDateTime: string;
  arrivalDateTime: string;
  fromCityId: number;
  fromCityName: string;
  fromCountry: string;
  fromStationId: string;
  fromStationName: string;
  fromStationAddress?: string | null;
  fromStationLat?: number | null;
  fromStationLon?: number | null;
  fromTimezone: string;
  toCityId: number;
  toCityName: string;
  toCountry: string;
  toStationId: string;
  toStationName: string;
  toStationAddress?: string | null;
  toStationLat?: number | null;
  toStationLon?: number | null;
  toTimezone: string;
  platform?: string | null;
  busModel?: string | null;
  busNumber?: string | null;
  transfers?: TransferOrderType | null;
  carrierId?: string | null;
  carrierName?: string | null;
  carrierPhone?: string | null;
  insurerId?: string | null;
  insurerName?: string | null;
  insurerAddress?: string | null;
  insurerPhone?: string | null;
  refundRules?: string[];
  baggageRules?: string[];
  createdAt: Date;
  updatedAt: Date;
  tickets: TicketType[];
};

export interface IUserOrdersResponse {
  data: UserOrdersType[];
  pagination: {
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
  };
}
