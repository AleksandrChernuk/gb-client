"use client";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFormContext } from "react-hook-form";
import IconBankCard from "../../icons/IconBankCard";
import IconMoney from "../../icons/IconMoney";
import { useTranslations } from "next-intl";

export default function Payment() {
  const { control } = useFormContext();
  const t = useTranslations("new_order");
  return (
    <FormField
      control={control}
      name="payment"
      render={({ field }) => (
        <FormItem className="border border-gray_1 rounded-lg dark:bg-dark_bg dark:border-black_2_for_text">
          <FormControl>
            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col ">
              <FormItem className="flex items-center space-x-3 space-y-0 p-4 border-solid border-b border-gray_1 last:border-b-0 dark:border-b-black_2_for_text">
                <FormControl>
                  <RadioGroupItem value="booking" />
                </FormControl>
                <FormLabel className="font-normal w-full cursor-pointer flex items-center space-x-3">
                  <span className="addional_medium_text laptop:h5 text-text_prymery">{t("booking")}</span>
                  <div className="size-6">
                    <IconMoney />
                  </div>
                </FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0 p-4 border-solid border-b border-gray_1 last:border-b-0 dark:border-b-black_2_for_text">
                <FormControl>
                  <RadioGroupItem value="card" />
                </FormControl>
                <FormLabel className="font-normal w-full cursor-pointer flex items-center space-x-3">
                  <span className="addional_medium_text laptop:h5 text-text_prymery">{t("bank_card")}</span>
                  <div className="size-6">
                    <IconBankCard />
                  </div>
                </FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0 p-4 border-solid border-b border-gray_1 last:border-b-0 dark:border-b-black_2_for_text">
                <FormControl>
                  <RadioGroupItem value="on_boarding" />
                </FormControl>
                <FormLabel className="font-normal w-full cursor-pointer flex items-center space-x-3">
                  <span className="addional_medium_text laptop:h5 text-text_prymery">{t("payment_upon_boarding")}</span>
                  <div className="size-6">
                    <IconMoney />
                  </div>
                </FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
