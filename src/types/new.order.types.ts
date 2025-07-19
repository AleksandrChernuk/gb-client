export interface IPassengerOrder {
  routeId: string | null;
  busId: string | null;
  ticketTypeId: string | null;
  firstName: string | null;
  lastName: string | null;
  birthdate: string | null;
  phone: string | null;
  email: string | null;
  sitizenship: string | null;
  gender: string | null;
  documentType: string | null;
  documentNumber: string | null;
  seatId: string | null;
  seatNumber: string | null;
  seatCoord: string | null;
  seatCoord2: string | null;
  discountId: string | null;
  discountId2: string | null;
  discountDescription: string | null;
  ticketPrice: string | null;
  withFees: string | null;
  luggageCount: string | null;
}

export interface INewOrder {
  orderId: string | null;
  routeId: string | null;
  tripId: string | null;
  intervalId: string | null;
  busId: string | null;
  fromCityId: string | null;
  toCityId: string | null;
  fromStationId: string | null;
  toStationId: string | null;
  date: string | null;
  tripType: string | null;
  createMode: string | null;
  currencyCode: string | null;
  passengers: IPassengerOrder[];
  customerId: string | null;
  customerFullName: string | null;
  cashlessPayment: string | null;
  reservationHoldTime: string | null;
  pspId: string | null;
  returnUrl: string | null;
}
