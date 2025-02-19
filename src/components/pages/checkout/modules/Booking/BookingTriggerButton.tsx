
'use client'

import { Button } from "@/components/ui/button";
import { useCurrentRouteStore } from "@/store/useCurrentRoute";
import { useTranslations } from "next-intl";
import IconSeat from "../../icons/IconSeat";
import { ChevronRight } from "lucide-react";

export default function BookingTriggerButton() {
  const t = useTranslations("new_order");
  const currentRoute = useCurrentRouteStore((state) => state.сurrentRoute);

  return (
    <Button
      disabled={!currentRoute?.details?.seats_map}
      variant={"outline"}
      type="button"
      className="flex items-center justify-between rounded-lg w-full h-auto p-3 bg-inherit border border-gray_1 hover:bg-grayy dark:hover:bg-dark_bg dark:border-black_2_for_text dark:hover:border-black_2_for_text active:border-black_2_for_text dark:active:border-dark_bg"
    >
      <div className="flex items-center gap-2">
        <div className="[&_svg]:fill-gray_2_for_body w-[45px] h-[56px]">
          <IconSeat />
        </div>
        <div className="h5 text-text_prymery">
          {!currentRoute?.details?.seats_map ? (
            <div className="flex flex-col items-start gap-1">
              <span>{t("free_seating")}</span>
              <span className="addional_medium_text">{t("seat_guaranteed")}</span>
            </div>
          ) : (
            t("choose_place")
          )}
        </div>
      </div>
      <ChevronRight size={32} className="stroke-gray_2_for_body" />
    </Button>
  );
}
