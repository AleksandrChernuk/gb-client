export interface IPassengerOrder {
  route_id: string | null;
  bus_id: string | null;
  ticket_type_id: string | null;
  first_name: string | null;
  last_name: string | null;
  birthdate: string | null;
  phone: string | null;
  email: string | null;
  sitizenship: string | null;
  gender: string | null;
  document_type: string | null;
  document_number: string | null;
  seat_id: string | null;
  seat_number: string | null;
  seat_coord: string | null;
  seat_coord_2: string | null;
  discount_id: string | null;
  discount_id_2: string | null;
  discount_description: string | null;
  ticket_price: string | null;
  with_fees: string | null;
  luggage_count: string | null;
}

export interface INewOrder {
  order_id: string | null;
  route_id: string | null;
  trip_id: string | null;
  interval_id: string | null;
  bus_id: string | null;
  from_city_id: string | null;
  to_city_id: string | null;
  from_station_id: string | null;
  to_station_id: string | null;
  date: string | null;
  trip_type: string | null;
  create_mode: string | null;
  currency_code: string | null;
  passengers: IPassengerOrder[];
  customer_id: string | null;
  customer_full_name: string | null;
  cashless_payment: string | null;
  reservation_hold_time: string | null;
  psp_id: string | null;
  return_url: string | null;
}
