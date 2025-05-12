import { ISeat } from './seat-interface';

export interface IOrder {
  provider_id: string;
  route_id: string | null;
  trip_id: string | null;
  interval_id: string | null;
  bus_id: string | null;
  ticket_type_id: string | null;
  route_name: string | null;
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
  trip_type: 'oneway' | 'twoway';
  payment_type: 'card' | 'on_boarding' | 'booking';
  currency: string;
  locale: string;
  userId?: string;
  email: string;
  phone: string;
  tickets: Iticket[];
}

export interface Iticket {
  first_name: string;
  last_name: string;
  birthdate?: string;
  document_type?: string | null;
  document_number?: string | null;
  seat: ISeat;
  discount?: string | null;
  ticket_price: number | null;
  with_fees?: number;
  luggage_count?: string | null;
}
