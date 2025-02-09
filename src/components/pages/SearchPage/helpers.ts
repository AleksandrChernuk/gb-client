import { IRouteResponse } from '@/types/route.types';
import { IStops } from '@/types/stops-interface';
import { addDays } from 'date-fns';
import { differenceInMilliseconds } from 'date-fns';

export const createDateArr = (centerDate: Date, length: number, lastNum: number): Date[] => {
  return Array.from({ length }, (_, index) => addDays(centerDate, index - lastNum));
};

export const getTimeOnRoad = (arrival: string, departure: string) => {
  const durationMs = differenceInMilliseconds(new Date(arrival), new Date(departure));

  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

  return { hours, minutes, durationMs };
};

export const getStopsProcessor = (route: IRouteResponse) => {
  switch (route.provider_name) {
    case 'KLR':
      return (stops: IStops[]) => {
        const startIdx = stops.findIndex(
          (el) => el.location.id === `${route?.details?.providerLocationFrom}`
        );
        const endIdx = stops.findIndex(
          (el) => el.location.id === `${route?.details?.providerLocationTo}`
        );

        return stops
          .map((el) => ({ ...el, arrival_date_time: el.departure_date_time }))
          .slice(startIdx === -1 ? 0 : startIdx, endIdx == -1 ? stops.length - 1 : endIdx + 1);
      };

    case 'Octobus':
      return (stops: IStops[]) => {
        const startIdx = stops.findIndex(
          (el) => el.station.id === `${route?.departure?.station_id}`
        );
        const endIdx = stops.findIndex((el) => el.station.id === `${route?.arrival?.station_id}`);

        return stops
          .map((el) => ({ ...el, arrival_date_time: el.departure_date_time }))
          .slice(startIdx === -1 ? 0 : startIdx, endIdx == -1 ? stops.length - 1 : endIdx + 1);
      };

    case 'TransTempo':
      return (stops: IStops[]) => {
        const startIdx = stops.findIndex(
        (el) => el.location.id === `${route?.details?.providerLocationFrom}`
      );
      const endIdx = stops.findIndex(
        (el) => el.location.id === `${route?.details?.providerLocationTo}`
      );

      return stops
        .map((el) => ({ ...el, arrival_date_time: el.departure_date_time }))
          .slice(startIdx === -1 ? 0 : startIdx, endIdx == -1 ? stops.length - 1 : endIdx + 1)
      };

    case 'EuroClub':
      return (stops: IStops[]) => {
        return stops.map((el) => ({
          ...el,
          departure_date_time:
            el.departure_date_time === '' ? el.arrival_date_time : el.departure_date_time,
          arrival_date_time:
            el.arrival_date_time === '' ? el.departure_date_time : el.arrival_date_time,
        }));
      };

    case 'EWE':
      return (stops: IStops[]) => {
        const startIdx = stops.findIndex(
          (el) => el.location.id === `${route?.details?.providerLocationFrom}`
        );
        const endIdx = stops.findIndex(
          (el) => el.location.id === `${route?.details?.providerLocationTo}`
        );

        return stops
          .map((el) => ({ ...el, arrival_date_time: el.departure_date_time }))
          .slice(startIdx === -1 ? 0 : startIdx, endIdx == -1 ? stops.length - 1 : endIdx + 1);
      };

    default:
      return (stops: IStops[]) => stops;
  }
};
