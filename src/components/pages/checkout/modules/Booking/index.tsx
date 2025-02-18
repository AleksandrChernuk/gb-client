"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomSheet from "@/components/shared/CustomSheet";
import { useState } from "react";
import { SheetClose, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCurrentRouteStore } from "@/store/useCurrentRoute";
 import SeatButton from "../../components/SeatButton";
 import IconSeat from "../../icons/IconSeat";
import { useTranslations } from "next-intl";
import { seats_map } from "../../seatsTest5obj";

export default function Booking() {
  const t = useTranslations("new_order");

  const currentRoute = useCurrentRouteStore((state) => state.сurrentRoute);
  const [open, setOpen] = useState(false);

  return (
    <CustomSheet
      open={open}
      toggleOpen={setOpen}
      trigger={
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
      }
      footer={
        <SheetFooter className="flex flex-row justify-between gap-2 bg-white dark:bg-dark_main  ">
          <div className="w-1/2 flex flex-col items-start justify-center">
            <div className="addional_regular_text text-text_prymery">No seats are booked</div>
            <div className="h5 text-text_prymery">0</div>
          </div>
          <div className="w-1/2">
            <SheetClose asChild>
              <Button type="button" className="py-2 px-3 w-full" variant={"default"}>
                Confirm
              </Button>
            </SheetClose>
          </div>
        </SheetFooter>
      }
      header={
        <SheetHeader>
          <SheetTitle className="sr-only">Edit profile</SheetTitle>
          <SheetDescription className="sr-only">
            Make changes to your profile here. Click save when youre done.
          </SheetDescription>
          <SheetClose asChild>
            <Button type="button" variant={"link"} className="gap-0.2 text-text_prymery h5">
              <ChevronLeft size={24} />
              Back
            </Button>
          </SheetClose>
        </SheetHeader>
      }
    >
      <ul className="flex flex-col gap-4 p-8 border-2 w-fit border-gray_1 dark:border-black_2_for_text my-10 rounded-[50px]">
        {seats_map[0].seats.map((row, rowIndex) => (
          <li key={rowIndex} className="flex gap-1">
            {row.map((seat, seatIndex) =>
              seat.id ? (
                <SeatButton
                  key={`${rowIndex}-${seatIndex}`}
                  seat_number={seat.number}
                  isFree={seat.status === "FREE"}
                />
              ) : (
                <div key={`empty-${rowIndex}-${seatIndex}`} className="w-12 h-12"></div>
              ),
            )}
          </li>
        ))}
      </ul>
    </CustomSheet>
  );
}
