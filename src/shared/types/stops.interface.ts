export interface IStops {
  departureDateTime: string | null;
  arrivalDateTime: string | null;
  stoppingTime: string | null; // hh:mm
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
  isChangeStations?: boolean; // Надо ли менять станции
  isDepartureChangeStations?: boolean; // Станция прибытия для пересадки
  isArrivalChangeStations?: boolean; // Станция пересадки для отправления
  changeStationsType?: 'manual' | 'auto'; // manual - пересадка за яку відповідає перевізник, auto - пасажир сам відповідає за пересадку
  transferTime?: string; // 'hh:mm'
}
