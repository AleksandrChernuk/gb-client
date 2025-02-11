'use client';

import { CustomDarwer } from '@/components/shared/CustomDarwer';
import { DrawerClose } from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LoaderCircle, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useCurrentRouteStore } from "@/store/useCurrentRoute";
import { IconLoader } from "@/components/icons/IconLoader";
import RoteDetails from "../../components/Details/DetailsStops";
import DetailsInfo from "../../components/Details/DetailsInfo";
import DetailsLuggage from "../../components/Details/DetailsLuggage";
import DetailsReturnPolicy from "../../components/Details/DetailsReturnPolicy";
import DetailsDiscounts from "../../components/Details/DetailsDiscounts";
import DetailsAmenities from "../../components/Details/DetailsAmenities";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

export default function MobileDetails({ handleSetCurretRoute }: { handleSetCurretRoute: () => void }) {
  const [open, setOpen] = useState<boolean>(false);
  const t = useTranslations("common");
  const currentLanguage = useLocale();
  const сurrentRoute = useCurrentRouteStore((state) => state.сurrentRoute);
  const router = useRouter();

  const loadingDetails = useCurrentRouteStore((state) => state.loadingDetails);
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <CustomDarwer
      open={open}
      toggleOpen={() => {
        setOpen((p) => !p);
      }}
      trigger={
        <Button
          variant={"link"}
          className="items-center justify-center text-xs font-bold underline"
          onClick={handleSetCurretRoute}
        >
          {t("details")}
        </Button>
      }
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-b-gray_0 dark:border-b-dark_main dark:bg-dark_main">
        <h3 className="font-medium h5 text-primary_1"> {t("details")}</h3>
        <DrawerClose asChild>
          <Button variant={"default"} className="flex items-center gap-1 p-1 rounded-md h5 bg-primary_1">
            <X color="#ffffff" />
          </Button>
        </DrawerClose>
      </div>
      <ScrollArea className="relative px-5 overflow-y-scroll grow bg-grayy dark:bg-dark_bg ">
        {loadingDetails ? (
          <div className="flex items-center justify-center gap-1 body_medium text-text_prymery tablet:min-w-[397px] py-28">
            <IconLoader />
          </div>
        ) : (
          <div className="my-6 space-y-6">
            <div className="space-y-4 ">
              <DetailsInfo />
              <RoteDetails />
            </div>

            <DetailsLuggage />
            <DetailsReturnPolicy />
            <DetailsAmenities />
            <DetailsDiscounts />
          </div>
        )}
      </ScrollArea>
      <div className="flex items-center justify-between gap-4 px-5 py-4 border-t border-t-gray_1 dark:border-t-black_2_for_text dark:bg-dark_main">
        <div className="mx-auto text-center">
          <div className="small_text text-gray_2_for_body dark:text-grayy">1 {t("placeholderPassenger")}</div>
          <div className="main_text_body text-black.2.for.text dark:text-gray_1">
            {Math.floor(сurrentRoute?.ticket_pricing.base_price || 0)} <span className="text-xs ml-[2px]">UAH</span>
          </div>
        </div>

        <Button
          variant={"default"}
          className="w-1/2 px-5 py-3 rounded-full button_mobile"
          onClick={() => {
            setLoading(true);
            router.push(`/${currentLanguage}/new-order`);
          }}
          disabled={loadingDetails}
        >
          {loading ? <LoaderCircle className="animate-spin" /> : t("selectButton")}
        </Button>
      </div>
    </CustomDarwer>
  );
}
