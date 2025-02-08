import { IStops } from './stops-interface';
import { IDiscount } from './discount-interface';
import { IReturnRules } from './return_rules-interface';
import { ISeat } from './seat-interface';
import { IInsurer } from './insurer-interface';
import { IFreeSeats } from './free_seats-interface';
import { ITranstempoSeat } from './seat_transtempo-interface';

export interface IGetRouteDetailsBody {
  routeId: string;
  intervalId: string; // Для EWE обязательно передать этот параметр!
  fromCityId: number;
  toCityId: number;
  fromStationId: number;
  toStationId: number;
  providerId: string;
  travelDate: string;
  locale: string;
  passengersCount: number;
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
  bus_pictures: string[] | null;
  seats_count: number | null;
  seats_map: ISeat[] | string | null;
  free_seats_map: IFreeSeats[] | null;
  seats_transtempo: ITranstempoSeat | null; // карта мест для Transtempo
  seats_transtempo_booked: number[] | null; // возвращает Transtempo
  luggage_fee: number | null;
  luggage_max_count: number | null;
  luggage_rules: string[] | null;
  amenities: string[] | null;
  insurer: IInsurer | null;
}
