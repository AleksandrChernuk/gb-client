import { IStops } from './stops.interface';
import { IDiscount } from './discount-interface';
import { IReturnRules } from './return.rules.interface';
import { TypeSeatsMap } from './seat.interface';
import { IInsurer } from './insurer.interface';
import { IFreeSeats } from './free.seats.interface';

export interface IRouteDetailsResponse {
  providerLocationFrom: string | null;
  providerLocationTo: string | null;
  stops: IStops[] | null;
  automatic_discount_id?: string | null; //!! New
  discounts: IDiscount[] | null;
  return_rules_description: string[] | null;
  return_rules: IReturnRules[] | null;
  transport_id?: string | null;
  bus_name: string | null;
  bus_number: string | null;
  bus_pictures: string[] | null;
  seats_count: number | null;
  seats_map: TypeSeatsMap[] | string | null;
  free_seats_map: IFreeSeats[] | null;
  max_tickets?: number | string;
  need_birth?: boolean | string;
  need_doc?: boolean | string;
  need_doc_expire_date?: boolean | string;
  need_citizenship?: boolean | string;
  need_gender?: boolean | string;
  need_middlename?: boolean | string;
  luggage_fee: number | null;
  luggage_max_count: number | null;
  luggage_rules: string[] | string | null;
  amenities: string[] | null;
  insurer: IInsurer | null;
}
