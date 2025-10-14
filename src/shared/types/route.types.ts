import { IDiscount } from './discount-interface';
import { IFreeSeats } from './free.seats.interface';
import { IInsurer } from './insurer.interface';
import { ILocation } from './location.types';
import { IReturnRules } from './return.rules.interface';
import { TypeSeatsMap } from './seat.interface';
import { IStops } from './stops.interface';

export interface IRouteDetailsResponse {
  providerLocationFrom: string | null;
  providerLocationTo: string | null;
  stops: IStops[] | null;
  automaticDiscountId?: string | null;
  discounts: IDiscount[] | null;
  returnRulesDescription: string[] | null;
  returnRules: IReturnRules[] | null;
  routeInfo?: string | null;
  canCyrillicOrderdata?: boolean;
  transportId?: string | null;
  busName: string | null;
  busNumber: string | null;
  busPictures: string[] | null;
  seatsCount: number | null;
  seatsMap: TypeSeatsMap[] | string | null;
  freeSeatsMap: IFreeSeats[] | null;
  maxTickets?: number | string;
  needBirth?: boolean | string;
  needDoc?: boolean | string;
  needDocExpireDate?: boolean | string;
  needCitizenship?: boolean | string;
  needGender?: boolean | string;
  needMiddlename?: boolean | string;
  luggageFee: number | null;
  luggageMaxCount: number | null;
  luggageRules: string[] | string | null;
  amenities: string[] | null;
  insurer: IInsurer | null;
}

export interface IGetRoutesBody {
  fromCityId: number;
  toCityId: number;
  travelDate: string;
  locale: string;
  daysCountLimit?: number;
}

export interface IGetRouteDetailsBody {
  routeId?: string;
  intervalId?: string;
  busId?: string;
  fromCityId?: number;
  toCityId?: number;
  fromStationId?: string;
  toStationId?: string;
  providerId: string;
  travelDate?: string;
  locale: string;
  currency: string;
  passengersCount?: number;
  metadata?: unknown;
  timetableId?: string;
  bustypeId?: string;
  hasPlan?: boolean;
  requestGetFreeSeats?: boolean;
  requestGetDiscount?: boolean;
  requestGetBaggage?: boolean;
}

export interface IRouteResponse {
  ticketId: string;
  identificators: {
    tripId?: string;
    intervalId?: string;
    distance?: number;
    busId?: string;
    rideId?: string;
    routeId?: string;
    routeNumber?: string;
    routeName?: string;
    metadata?: unknown;
    timetableId?: string;
    bustypeId?: string | null;
    searchId?: string;
    providerId: string;
    hasPlan?: boolean | string;
    requestGetFreeSeats?: boolean | string;
    requestGetDiscount?: boolean | string;
    requestGetBaggage?: boolean | string;
  };
  providerName: string;
  allowedOperations: {
    purchaseAllowed: boolean;
    saleCloseAt: string | null;
    reservationAllowed: boolean | null;
    reservationCloseAt: string | null;
    reservationTime: number | null;
    canPaymentToDriver: boolean | null;
  };
  departure: {
    fromLocation: ILocation;
    stationId: number | null;
    stationName: string | null;
    stationAddress: string | null;
    stationCoordsLat: number | null;
    stationCoordsLon: number | null;
    dateTime: string | null;
  };
  arrival: {
    toLocation: ILocation;
    stationId: number | null;
    stationName: string | null;
    stationAddress: string | null;
    stationCoordsLat: number | null;
    stationCoordsLon: number | null;
    dateTime: string | null;
  };
  duration: string | null;
  busChange: boolean | null;
  eTicket: boolean | null;
  ticketChange: boolean | null;
  ticketPricing: {
    ticketCode?: string | null;
    basePrice: number | null;
    priceWithDiscount: number | null;
    discountPercentage: number | null;
    currency: string;
  };
  seats: {
    freeSeats: number | null;
    seatNumberSelectionAllowed: boolean | null;
    freeChoiceOfPlaces: boolean | null;
  };
  carrier: {
    id: string | null;
    name: string | null;
    logo: string | null;
    rating: number | null;
  };
  details: IRouteDetailsResponse | null;
}
