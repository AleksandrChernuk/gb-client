"use client";

import { ChevronRight } from "lucide-react";
import IconSeat from "../../icons/IconSeat";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import CustomSheet from "@/components/shared/CustomSheet";
import { useState } from "react";

export default function Booking() {
  const t = useTranslations("new_order");
  const [open, setOpen] = useState(false);

  return (
    <CustomSheet
      open={open}
      toggleOpen={setOpen}
      trigger={
        <Button
          variant={"outline"}
          type="button"
          className="flex items-center justify-between rounded-lg w-full h-auto p-3 bg-inherit border border-gray_1 hover:bg-grayy dark:hover:bg-dark_bg dark:border-black_2_for_text dark:hover:border-black_2_for_text active:border-black_2_for_text dark:active:border-dark_bg"
        >
          <div className="flex items-center gap-2">
            <div className="[&_svg]:fill-gray_2_for_body w-[45px] h-[56px]">
              <IconSeat />
            </div>
            <span className="h5 text-text_prymery">{t("choose_place")}</span>
          </div>
          <ChevronRight size={32} className="stroke-gray_2_for_body" />
        </Button>
      }
    >
      <ChevronRight size={32} className="stroke-gray_2_for_body" />
    </CustomSheet>
  );
}
