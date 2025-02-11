import { useCurrentRouteStore } from "@/store/useCurrentRoute";
import { format, parseISO } from "date-fns";
import LocationDisplay from "../../LocationDisplay";
import { useLocale } from "next-intl";
import { extractLocationDetails } from "@/lib/extractLocationDetails";

export default function DetailsStopsPreview() {
  const сurrentRoute = useCurrentRouteStore((state) => state.сurrentRoute);
  const сurrentLocale = useLocale();
  return (
    <>
      <div className={`relative flex items-start justify-start  `}>
        <span className={`button_mobile text-text_prymery mr-9 min-w-[40px] max-w-[40px]`}>
          {format(сurrentRoute?.departure.date_time || new Date(), "HH:mm")}
        </span>

        <div
          className={`relative after:content-[''] before:absolute after:rounded-full before:border-[2px] before:border-blackmode    before:bg-white dark:before:bg-dark_main tablet:dark:before:bg-dark_bg before:w-4 before:h-4 before:top-0 before:-left-[19px] before:-translate-x-1/2 before:rounded-full before:z-20`}
          // className='details_stops_item'
          //bg-grayy dark:bg-dark_bg
        >
          <LocationDisplay
            variant="mobile"
            location={
              (сurrentRoute &&
                extractLocationDetails(сurrentRoute?.departure.fromLocation, сurrentLocale).locationName) ||
              ""
            }
            address={сurrentRoute?.departure.station_address || ""}
          />
        </div>
      </div>
      <div
        className={`relative flex items-start justify-start  overflow-hidden z-10 bg-grayy tablet:bg-white dark:bg-dark_bg tablet:dark:bg-card_bg_primery'}`}
      >
        <span className={`button_mobile text-text_prymery mr-9 min-w-[40px] max-w-[40px]`}>
          {format(parseISO(сurrentRoute?.arrival.date_time || ""), "HH:mm")}
        </span>

        <div
          className={`relative after:content-[''] before:absolute after:rounded-full before:border-[2px] before:border-primary_1  before:w-4 before:h-4 before:top-0 before:-left-[19px] before:-translate-x-1/2 before:rounded-full before:z-20`}
        >
          <span className="absolute w-[8px] h-[8px] rounded-full bg-primary_1 top-[4px] -left-[19px] -translate-x-1/2"></span>

          <LocationDisplay
            variant="mobile"
            location={
              (сurrentRoute && extractLocationDetails(сurrentRoute?.arrival.toLocation, сurrentLocale).locationName) ||
              ""
            }
            address={сurrentRoute?.arrival.station_address || ""}
          />
        </div>
      </div>
    </>
  );
}
