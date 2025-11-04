import { IChangeStations } from '@/shared/types/route.change.stations.interface';
import { IDiscount } from './discount-interface';
import { IFreeSeats } from './free.seats.interface';
import { IInsurer } from './insurer.interface';
import { ILocation } from './location.types';
import { IReturnRules } from './return.rules.interface';
import { TypeSeatsMap } from './seat.interface';
import { IStops } from './stops.interface';

export interface IBaggagePrice {
  baggageId: string;
  baggageTypeId: string;
  baggageType: string;
  baggageTypeAbbreviated: string | null;
  baggageTitle: string;
  length: string;
  width: string;
  height: string;
  kg: string;
  maxInBus: string;
  maxPerPerson: string;
  price: number;
  currency: string;
}

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
  freeSeatsMap?: IFreeSeats[] | (number | string)[] | null;
  freeSeats: number | null;
  maxTickets?: number | string;
  needBirth?: boolean | string;
  needDoc?: boolean | string;
  needDocExpireDate?: boolean | string;
  needCitizenship?: boolean | string;
  needGender?: boolean | string;
  needMiddlename?: boolean | string;
  luggageFee: number | null;
  luggageMaxCount: number | null;
  luggageRules?: string[] | null;
  amenities: string[] | null;
  insurer: IInsurer | null;
  baggagePrice: IBaggagePrice[] | null;
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
  freeSeats?: IFreeSeats[] | (number | string)[] | null;
  requestGetDiscount?: boolean;
  requestGetBaggage?: boolean;
  basePrice: number | null;
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
    hasPlan?: number;
    requestGetFreeSeats?: boolean;
    requestGetDiscount?: boolean;
    requestGetBaggage?: boolean;
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
  changeStations?: IChangeStations[]; //! New
  eTicket: boolean | null;
  ticketChange: boolean;
  refundOnlyOrder: boolean | null; // Возврат всего ордера - true, по билетам - false
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
    phone: string | null; //! Телефон диспетчера
  };
  details: IRouteDetailsResponse | null;
}
