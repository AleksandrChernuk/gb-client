export type UserCurrentTripType = {
  routeName: string;
  fromCityName: string;
  fromCountry: string;
  fromStationName: string;
  fromStationAddress: string | null;
  fromStationLat: number | null;
  fromStationLon: number | null;
  fromTimezone: string | null;
  toCityName: string;
  toCountry: string;
  toStationName: string;
  toStationAddress: string | null;
  toStationLat: number | null;
  toStationLon: number | null;
  toTimezone: string | null;
  departureDateTime: string;
  arrivalDateTime: string;
  duration: string;
  passengersCount: number;
  tripType: 'oneway' | 'twoway';
  carrierId: string | null;
  carrierName: string | null;
  busModel: string | null;
  busNumber: string | null;
  myOrderId: string;
  orderNumber: string;
  totalPrice: string;
  currency: string;
  providerId: string;
  routeId: string | null;
  rideId: string | null;
  tripId: string | null;
  intervalId: string | null;
  timetableId: string | null;
  bustypeId: string | null;
  busId: string | null;
};

export interface IUserCompletedTrips {
  data: UserCurrentTripType[];
  pagination: {
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
  };
}
