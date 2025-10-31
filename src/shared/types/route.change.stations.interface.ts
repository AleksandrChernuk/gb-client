export interface IChangeStations {
  fromLocationName: string;
  fromStation: string;
  fromStationLat: number;
  fromstationLon: number;
  fromDateTime: string;
  toLocationName: string;
  toStation: string;
  toStationLat: number;
  tostationLon: number;
  toDateTime: string;
  freeSeats: number[];
  carrier: string;
  isChangeStations?: boolean; // Надо ли менять станцию
  changeStationsType?: 'manual' | 'auto'; // manual - пересадка за яку відповідає перевізник, auto - пасажир сам відповідає за пересадку
  transferTime?: string; // 'hh:mm'
}
