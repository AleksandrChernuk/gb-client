import { ILocation } from './location.types';
import { IRouteDetailsResponse } from './route.details.interface';

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
  bus_id?: string;
  fromCityId?: number;
  toCityId?: number;
  fromStationId?: string;
  toStationId?: string;
  providerId: string;
  travelDate?: string;
  search_id?: string;
  locale: string;
  currency: string;
  passengersCount?: number;
  metadata?: unknown | null;
  timetable_id?: string;
  bustype_id?: string;
  has_plan?: string | boolean;
  request_get_free_seats?: string | boolean;
  request_get_discount?: string | boolean;
  request_get_baggage?: string | boolean;
}

export interface IRouteResponse {
  ticket_id: string;
  identificators: {
    tripId?: string;
    intervalId?: string;
    distance?: number;
    bus_id?: string;
    ride_id?: string;
    route_id?: string;
    route_number?: string;
    route_name?: string;
    metadata?: unknown;
    timetable_id?: string;
    bustype_id?: string | null;
    search_id?: string;
    provider_id: string;
    has_plan?: boolean | string;
    request_get_free_seats?: boolean | string;
    request_get_discount?: boolean | string;
    request_get_baggage?: boolean | string;
  };
  provider_name: string;
  allowed_operations: {
    purchase_allowed: boolean;
    sale_close_at: string | null;
    reservation_allowed: boolean | null;
    reservation_close_at: string | null;
    reservation_time: number | null;
    can_payment_to_driver: boolean | null;
  };
  departure: {
    fromLocation: ILocation;
    station_id: number | null;
    station_name: string | null;
    station_address: string | null;
    station_coords_lat: number | null;
    station_coords_lon: number | null;
    date_time: string | null;
  };
  arrival: {
    toLocation: ILocation;
    station_id: number | null;
    station_name: string | null;
    station_address: string | null;
    station_coords_lat: number | null;
    station_coords_lon: number | null;
    date_time: string | null;
  };
  duration: string | null;
  bus_change: boolean | null;
  e_ticket: boolean | null;
  ticket_pricing: {
    ticket_code?: string | null; //! New
    base_price: number | null;
    price_with_discount: number | null;
    discount_percentage: number | null;
    currency: string;
  };
  seats: {
    free_seats: number | null;
    seat_number_selection_allowed: boolean | null;
    free_choice_of_places: boolean | null;
  };
  carrier: {
    id: string | null;
    name: string | null;
    logo: string | null;
    rating: number | null;
  };
  details: IRouteDetailsResponse | null;
}
