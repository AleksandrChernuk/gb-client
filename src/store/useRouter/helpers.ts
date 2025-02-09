import { sortBuy } from '@/constans/sortbuylist.constans';
import { ICarriers } from '@/types/carriers.types';
import { IRouteResponse } from '@/types/route.types';
import { differenceInMilliseconds, toDate } from 'date-fns';

export const sortedRoutes = ({ sortBy, data }: { sortBy: string; data: IRouteResponse[] }) => {
  return data.toSorted((a, b) => {
    const getDuration = (route: IRouteResponse) =>
      differenceInMilliseconds(
        new Date(route?.arrival?.date_time || 0),
        new Date(route?.departure?.date_time || 0)
      );

    switch (sortBy) {
      case sortBuy.SORT_BUY_DEPARTURE_TIME:
        return (
          toDate(a?.departure?.date_time || new Date()).getTime() -
          toDate(b?.departure?.date_time || new Date()).getTime()
        );

      case sortBuy.SORT_BUY_ARRIVAL_TIME:
        return (
          toDate(a?.arrival?.date_time || new Date()).getTime() -
          toDate(b?.arrival?.date_time || new Date()).getTime()
        );

      case sortBuy.SORT_BUY_TIME_ON_ROAD:
        return getDuration(a) - getDuration(b);

      case sortBuy.SORT_BUY_PRICE:
        return (
          Math.floor(a?.ticket_pricing?.base_price || 0) -
          Math.floor(b?.ticket_pricing?.base_price || 0)
        );

      case sortBuy.SORT_BUY_POPULARITY:
        return 0;

      default:
        return 0;
    }
  });
};

export const sortedCarriers = ({ data }: { data: IRouteResponse[] }) => {
  const carriers = data.reduce(
    (acc, el) => {
      const carrierName = el.carrier?.name || 'Unknown Carrier';

      if (!acc[carrierName]) {
        acc[carrierName] = { name: carrierName, id: Object.keys(acc).length + 1, count: 0 };
      }

      acc[carrierName].count++;
      return acc;
    },
    {} as Record<string, ICarriers>
  );

  return Object.values(carriers);
};

export const filterRoutesByCarriers = (routes: IRouteResponse[], carriers: string[]) => {
  return carriers.length > 0
    ? routes.filter((route) => route.carrier?.name && carriers.includes(route.carrier.name))
    : routes;
};
