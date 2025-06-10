export interface ISeatOrder {
  seat_id?: number;
  seat_number?: number;
}

export interface IDiscountOrder {
  discount_id?: string;
  discount_description?: string;
  discount_percent?: number;
}

export interface TicketInterface {
  first_name: string;
  last_name: string;
  middlename?: string;
  birthdate: string;
  document_type: number;
  document_number: string;
  document_expire_at?: string; // example: '2030-12-31',
  gender?: 'M' | 'F';
  citizenship?: string; // example: 'UA'
  phone: string;
  email: string;
  seat?: ISeatOrder;
  discount?: IDiscountOrder;
  with_fees?: boolean;
  buggage_count?: number;
}

export interface OrderInterface {
  provider_id: string;
  route_id?: string;
  ride_id?: string;
  tripId?: string;
  intervalId?: string;
  bus_id?: string;
  route_name?: string;
  can_payment_to_driver: boolean; //! false
  metadata?: unknown; //! New
  from_city_id: number;
  from_city_name: string;
  to_city_id: number;
  to_city_name: string;
  from_station_id: number;
  from_station_name: string;
  from_station_lat?: number;
  from_station_lon?: number;
  to_station_id: number;
  to_station_name: string;
  to_station_lat?: number;
  to_station_lon?: number;
  departure_date: string;
  arrival_date: string; //example: '2025-06-15'
  departure_time: string;
  arrival_time: string;
  carrier_id?: string;
  carrier_name?: string;
  trip_type?: 'ONEWAY';
  payment_type: 'RESERVE' | 'BOOK' | 'PAYMENT_AT_BOARDING'; //RESERVE
  currency: 'UAH'; //example: 'UAH'
  locale: string;
  userId?: string;
  customer_first_name: string; // userId.first_name ?? customer_first_name
  customer_last_name: string; // userId.last_name ?? customer_last_name
  customer_email: string;
  customer_phone: string;
  automatic_discount_id?: string; //! New
  tickets: TicketInterface[];
}
