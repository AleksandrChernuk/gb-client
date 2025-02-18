'use client'
import { IRouteResponse } from "@/types/route.types";
import { IconRouteRigth } from "../images/IconRouteRigth";
import { IconRouteLeft } from "../images/IconRouteLeft";
import { extractLocationDetails } from "@/lib/extractLocationDetails";
import { format } from "date-fns";
import { useTranslations } from "next-intl";

type Props = {
  route: IRouteResponse
  locale:string
};

export default function RouteTicketDesctop({ route, locale }: Props) {
  const durationArr = route?.duration ? route?.duration.split(":") : "";
  const t = useTranslations("search");
  
return (
  <div className="justify-between hidden w-full grid-cols-3 gap-2 tablet:grid">
    <div className="flex flex-col">
      <span className="h3 laptop:h1 text-text_prymery">{format(route.departure.date_time || new Date(), "HH:mm")}</span>
      <span className="h5 laptop:h4 text-text_prymery">
        {extractLocationDetails(route.departure.fromLocation, locale).locationName}{" "}
      </span>
      <div className="addional_regular_text text-text_secondary  text-wrap">
        {route.departure.station_address || ""}
      </div>
    </div>

    <div className="flex items-center justify-center w-full gap-2">
      <div className="w-[49px] h-[17px]">
        <IconRouteLeft />
      </div>
      <div className="small_text text-black.2.for.text  dark:text-gray_1">{`${durationArr[0]}${t("shortHours")},${
        durationArr[1]
      }${t("shortMinutes")}`}</div>
      <div className="w-[49px] h-[17px]">
        <IconRouteRigth />
      </div>
    </div>

    <div className="flex flex-col gap-1">
      <span className="h3 laptop:h1 text-text_prymery">{format(route.arrival.date_time || new Date(), "HH:mm")}</span>
      <span className="h5 laptop:h4 text-text_prymery">
        {extractLocationDetails(route.arrival.toLocation, locale).locationName}{" "}
      </span>
      <div className="addional_regular_text text-text_secondary  text-wrap">{route.arrival.station_address || ""}</div>
    </div>
  </div>
);
}
