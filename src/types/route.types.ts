import { ILocation } from './location.types';
import { IRouteDetailsResponse } from './routeDetails-interface';

export interface IGetRoutesBody {
  fromCityId: number;
  toCityId: number;
  travelDate: string;
  locale: string;
  daysCountLimit?: number;
}

export interface IGetRouteDetailsBody {
  routeId: string
  intervalId: string
  fromCityId: number
  toCityId: number
  fromStationId: number | string
  toStationId: number | string
  providerId: string
  travelDate: string
  locale: string
  passengersCount: number
  metadata: unknown | null // new
}

export interface IRouteResponse {
  identificators: {
    tripId: string | null
    intervalId: string | null
    distance: number | null
    bus_id: string | null
    route_id: string
    route_number: string | null
    route_name: string | null
    metadata: unknown | null
    provider_id: string
  }
  provider_name: string
  allowed_operations: {
    purchase_allowed: boolean
    sale_close_at: string | null
    reservation_allowed: boolean | null
    reservation_close_at: string | null
    reservation_time: number | null
    can_payment_to_driver: boolean | null
  }
  departure: {
    fromLocation: ILocation
    station_id: number | null
    station_name: string | null
    station_address: string | null
    station_coords_lat: number | null
    station_coords_lon: number | null
    date_time: string | null
  }
  arrival: {
    toLocation: ILocation
    station_id: number | null
    station_name: string | null
    station_address: string | null
    station_coords_lat: number | null
    station_coords_lon: number | null
    date_time: string | null
  }
  duration: string | null
  bus_change: boolean | null
  e_ticket: boolean | null
  ticket_pricing: {
    base_price: number | null
    price_with_discount: number | null
    discount_percentage: number | null
    currency: string
  }
  seats: {
    free_seats: number | null
    seat_number_selection_allowed: boolean | null
    free_choice_of_places: boolean | null
  }
  carrier: {
    id: string | null
    name: string | null
    logo: string | null
    rating: number | null
  }
  details: IRouteDetailsResponse | null
}
