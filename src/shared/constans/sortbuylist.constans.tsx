import { ArrowDownWideNarrow, ArrowUpNarrowWide, ClockArrowDown, ClockArrowUp, Route } from 'lucide-react';

export const sortBuy = {
  SORT_BUY_PRICE_ASC: 'sort_buy_price_asc',
  SORT_BUY_PRICE_DESC: 'sort_buy_price_desc',
  SORT_BUY_DEPARTURE_TIME: 'sort_buy_departure_time',
  SORT_BUY_ARRIVAL_TIME: 'sort_buy_arrival_time',
  SORT_BUY_TIME_ON_ROAD: 'sort_buy_time_on_road',
  SORT_BUY_POPULARITY: 'sort_buy_popularity',
};

export type TSortBuy = (typeof sortBuy)[keyof typeof sortBuy];

export const sortBuyItems = [
  {
    type: sortBuy.SORT_BUY_PRICE_ASC,
    value: 'price_asc_sort',
    icon: <ArrowUpNarrowWide color="#098537" />,
  },
  {
    type: sortBuy.SORT_BUY_PRICE_DESC,
    value: 'price_desc_sort',
    icon: <ArrowDownWideNarrow color="#098537" />,
  },
  {
    type: sortBuy.SORT_BUY_DEPARTURE_TIME,
    value: 'departure_time_sort',
    icon: <ClockArrowUp color="#098537" />,
  },
  {
    type: sortBuy.SORT_BUY_ARRIVAL_TIME,
    value: 'arrival_time_sort',
    icon: <ClockArrowDown color="#098537" />,
  },
  {
    type: sortBuy.SORT_BUY_TIME_ON_ROAD,
    value: 'time_on_road',
    icon: <Route color="#098537" />,
  },
];
