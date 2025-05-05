import { IStops } from './stops-interface';
import { IDiscount } from './discount-interface';
import { IReturnRules } from './return_rules-interface';
import { TypeSeatsMap } from './seat-interface';
import { IInsurer } from './insurer-interface';
import { IFreeSeats } from './free_seats-interface';

export interface IGetRouteDetailsBody {
  routeId: string;
  intervalId: string;
  fromCityId: number | string;
  toCityId: number | string;
  fromStationId: number | string;
  toStationId: number | string;
  providerId: string;
  travelDate: string;
  locale: string;
  passengersCount: number;
  metadata: unknown | null;
}

export interface IRouteDetailsResponse {
  providerLocationFrom: string | null;
  providerLocationTo: string | null;
  stops: IStops[] | null;
  discounts: IDiscount[] | null;
  return_rules_description: string[] | null;
  return_rules: IReturnRules[] | null;
  bus_id: string | null;
  bus_name: string | null;
  bus_number: string | null;
  bus_pictures: string[] | null;
  seats_count: number | null;
  seats_map: TypeSeatsMap[] | string | null;
  free_seats_map: IFreeSeats[] | null;
  luggage_fee: number | null;
  luggage_max_count: number | null;
  luggage_rules: string[] | null;
  amenities: string[] | null;
  insurer: IInsurer | null;
}
