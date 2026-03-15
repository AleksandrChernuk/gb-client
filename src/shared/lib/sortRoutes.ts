import { sortBuy } from '@/shared/constans/sortbuylist.constans';
import { IRouteResponse } from '@/shared/types/route.types';
import { differenceInMilliseconds, toDate } from 'date-fns';

export function sortRoutes(sortBy: string, data: IRouteResponse[]): IRouteResponse[] {
  return data.toSorted((a, b) => {
    switch (sortBy) {
      case sortBuy.SORT_BUY_PRICE_ASC:
        return (a.ticketPricing?.basePrice ?? 0) - (b.ticketPricing?.basePrice ?? 0);

      case sortBuy.SORT_BUY_PRICE_DESC:
        return (b.ticketPricing?.basePrice ?? 0) - (a.ticketPricing?.basePrice ?? 0);

      case sortBuy.SORT_BUY_DEPARTURE_TIME:
        return toDate(a.departure?.dateTime ?? 0).getTime() - toDate(b.departure?.dateTime ?? 0).getTime();

      case sortBuy.SORT_BUY_ARRIVAL_TIME:
        return toDate(a.arrival?.dateTime ?? 0).getTime() - toDate(b.arrival?.dateTime ?? 0).getTime();

      case sortBuy.SORT_BUY_TIME_ON_ROAD: {
        const dur = (r: IRouteResponse) =>
          differenceInMilliseconds(new Date(r.arrival?.dateTime ?? 0), new Date(r.departure?.dateTime ?? 0));
        return dur(a) - dur(b);
      }

      default:
        return 0;
    }
  });
}
