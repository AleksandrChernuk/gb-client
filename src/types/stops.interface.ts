export interface IStops {
  departure_date_time: string | null;
  arrival_date_time: string | null;
  stopping_time: string | null;
  location: {
    id: string | null;
    name: string | undefined | null;
    region: string | null;
    country: string | null;
    country_code: string | null;
    type: string | null;
  };
  station: {
    id: string | null;
    name: string | null;
    address: string | undefined | null;
    lat: number | null;
    lon: number | null;
  };
  bus_changes: boolean | null;
  bus_changes_duration: string | null;
}
