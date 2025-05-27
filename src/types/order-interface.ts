import { ISeat } from './seat.interface';

export interface IOrder {
  provider_id: string;
  route_id?: string | null;
  trip_id?: string | null;
  tripId?: string;
  intervalId?: string | null;
  bus_id?: string | null;
  ticket_type_id?: number | null;
  route_name?: string | null;
  from_city_id: number;
  from_city_name: string;
  to_city_id: number;
  to_city_name: string;
  from_station_id: number | null;
  from_station_name: string | null;
  from_station_lat: number | null;
  from_station_lon: number | null;
  to_station_id: number | null;
  to_station_name: string | null;
  to_station_lat: number | null;
  to_station_lon: number | null;
  departure_date: string | null;
  arrival_date: string | null;
  departure_time: string | null;
  arrival_time: string | null;
  carrier_id: string | null;
  carrier_name: string | null;
  trip_type: 'oneway';
  payment_type: 'PURCHASE' | 'BOOK' | 'PAYMENT_AT_BOARDING';
  currency: string;
  locale: string;
  userId?: string;
  customer_email: string;
  customer_phone: string;
  tickets: Iticket[];
}

export interface Iticket {
  seat_id?: number;
  seat_number?: number;
  discount_id: string;
  discount_description?: string;
  discount_percent?: number;
  first_name: string;
  last_name: string;
  middlename?: string;
  birthdate?: string;
  document_type?: string | null;
  document_number?: string | null;
  seat: ISeat;
  discount?: string | null;
  ticket_price: number | null;
  with_fees?: number;
  luggage_count?: string | null;
}
