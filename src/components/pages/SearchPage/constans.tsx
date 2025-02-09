import { IconLocationPoint } from "@/components/icons/IconLocationPoint";
import { IconLowestPrice } from "@/components/icons/IconLowestPrice";
import { IconTime } from "@/components/icons/IconTime";

export const filterItems = {
  "sort-by": [
    { id: "departure_time", value: "departure_time", title: "Час відправлення", icon: <IconTime /> },
    {
      id: "arrival_time",
      value: "arrival_time",
      title: "Час прибуття",
      icon: <IconTime />,
    },
    {
      id: "time_on_road",
      value: "time_on_road",
      title: "Час у дорозі",
      icon: <IconTime />,
    },
    { id: "price", value: "price", title: "Ціна", icon: <IconLowestPrice /> },
    {
      id: "popularity",
      value: "popularity",
      title: "Популярність",
      icon: <IconLocationPoint />,
    },
  ],

  "bus-companies": [
    { id: "orionbus", title: "Orionbus" },
    { id: "klr", title: "KLR bus" },
    { id: "musiltour", title: "MusilTour" },
  ],
};
