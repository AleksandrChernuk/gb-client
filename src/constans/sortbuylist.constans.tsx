import { BadgeEuro, ClockArrowDown, ClockArrowUp, Route } from 'lucide-react';

export const sortBuy = {
  SORT_BUY_PRICE: 'sort_buy_price',
  SORT_BUY_DEPARTURE_TIME: 'sort_buy_departure_time',
  SORT_BUY_ARRIVAL_TIME: 'sort_buy_arrival_time',
  SORT_BUY_TIME_ON_ROAD: 'sort_buy_time_on_road',
  SORT_BUY_POPULARITY: "'sort_buy_popularity'",
};

export const sortBuyItems = [
  {
    type: sortBuy.SORT_BUY_PRICE,
    value: 'price_sort',
    icon: <BadgeEuro color='#098537' />,
  },
  {
    type: sortBuy.SORT_BUY_DEPARTURE_TIME,
    value: 'departure_time_sort',
    icon: <ClockArrowUp color='#098537' />,
  },
  {
    type: sortBuy.SORT_BUY_ARRIVAL_TIME,
    value: 'arrival_time_sort',
    icon: <ClockArrowDown color='#098537' />,
  },
  {
    type: sortBuy.SORT_BUY_TIME_ON_ROAD,
    value: 'time_on_road',
    icon: <Route color='#098537' />,
  },
];
