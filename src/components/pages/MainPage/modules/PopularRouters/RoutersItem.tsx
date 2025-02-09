import { IconRoute } from "@/components/icons/IconRoute";
import { IconRouteArrow } from "@/components/icons/IconRouteArrow";
import Link from "next/link";
import React from "react";

type TIRoutersItem = {
  from: string | undefined;
  to: string | undefined;
};

export default function RoutersItem({ from, to }: TIRoutersItem) {
  return (
    <Link
      href={{
        pathname: "/about",
        query: { from: from, to: to },
      }}
      className="block h-auto bg-white hover:bg-grayy focus:bg-grayy border-[1px] 
      border-transparent focus:border-black dark:bg-background_black_mode dark:hover:bg-black 
      dark:focus:bg-black_2_for_text dark:focus:border-gray_1 px-4 py-3 tablet:py-[18px] laptop:p-6 rounded-lg laptop:rounded-2xl transition-colors duration-300"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-1 tablet:gap-2">
          <span className="secondary_text tablet:main_text_body aptop:leading-6 text-text_prymery_color">{from}</span>
          <div className="w-[62px] h-[20px]">
            <IconRoute />
          </div>
          <span className="secondary_text tablet:main_text_body laptop:leading-6 text-text_prymery_color">{to}</span>
        </div>
        <div className="w-6 h-6">
          <IconRouteArrow />
        </div>
      </div>
    </Link>
  );
}
