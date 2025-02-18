"use client";

import { useState } from "react";
import { MobileDate } from "./components/Date/MobileDate";
import { DesktopDate } from "./components/Date/DesktopDate";
import { MobilePassengers } from "./components/Passengers/MobilePassengers";
import { DesktopPassengers } from "./components/Passengers/DesktopPassengers";
import { Line, SearchBox, SubmitButton } from "./ui";
import { MobCitySeacrh } from "./components/CitySearch/MobileCitySearch";
import { DesctopCitySearch } from "./components/CitySearch/DesctopCitySearch";
import { useRouter } from "next/navigation";

import { z } from 'zod';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useSearchStore } from '@/store/useSearch';
import { useLocale } from "next-intl";

export const formSchema = z.object({
  from: z.object({}, { message: "required" }),
  to: z.object({}, { message: "required" }),
});

const Search = () => {
  const matches = useMediaQuery("(max-width: 767px)");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentLocale = useLocale();
  const route = useRouter();

  const handleSubmit = () => {
    const { to, from, adult, children, date, setErrors } = useSearchStore.getState();

    setIsSubmitting(true);
    const validationResult = formSchema.safeParse({ from, to });

    if (!validationResult.success) {
      const formattedErrors = validationResult.error.format();

      setErrors("from", formattedErrors.from?._errors[0] || null);
      setErrors("to", formattedErrors.to?._errors[0] || null);
      setIsSubmitting(false);

      return;
    }
    route.push(
      `/${currentLocale}/buses?from=${from?.id}&to=${to?.id}&date=${date}&adult=${adult}&children=${children}`,
    );
    setIsSubmitting(false);
  };

  return (
    <SearchBox>
      <div className="flex flex-col h-full tablet:flex-row ">
        <div className="items-center grid-cols-4 p-4 tablet:grid tablet:gap-4 laptop:gap-10">
          {matches ? (
            <>
              <MobCitySeacrh name={"from"} />
              <Line />
              <MobCitySeacrh name={"to"} />
              <Line />
              <MobileDate />
              <Line />
              <MobilePassengers />
            </>
          ) : (
            <>
              <DesctopCitySearch name={"from"} />
              <DesctopCitySearch name={"to"} />
              <DesktopDate />
              <DesktopPassengers />
            </>
          )}
        </div>
        <SubmitButton handleSubmit={handleSubmit} disabled={isSubmitting} />
      </div>
    </SearchBox>
  );
};

export default Search;