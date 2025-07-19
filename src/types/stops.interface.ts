export interface IStops {
  departureDateTime: string | null;
  arrivalDateTime: string | null;
  stoppingTime: string | null;
  location: {
    id: string | null;
    name: string | undefined | null;
    region: string | null;
    country: string | null;
    countryCode: string | null;
    type: string | null;
  };
  station: {
    id: string | null;
    name: string | null;
    address: string | undefined | null;
    lat: number | null;
    lon: number | null;
  };
  busChanges: boolean | null;
}
