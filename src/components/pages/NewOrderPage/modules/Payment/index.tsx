"use client";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFormContext } from "react-hook-form";
import IconBankCard from "../../icons/IconBankCard";
import IconMoney from "../../icons/IconMoney";

export default function Payment() {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="payment"
      render={({ field }) => (
        <FormItem className="border border-gray_1 rounded-lg">
          <FormControl>
            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col ">
              <FormItem className="flex items-center space-x-3 space-y-0 p-4 border-solid border-b border-gray_1 last:border-b-0">
                <FormControl>
                  <RadioGroupItem value="booking" />
                </FormControl>
                <FormLabel className="font-normal w-full cursor-pointer flex items-center space-x-3">
                  <span className="button_mobile text-text_prymery">Booking</span>
                  <div className="size-6">
                    <IconMoney />
                  </div>
                </FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0 p-4 border-solid border-b border-gray_1 last:border-b-0">
                <FormControl>
                  <RadioGroupItem value="card" />
                </FormControl>
                <FormLabel className="font-normal w-full cursor-pointer flex items-center space-x-3">
                  <span className="button_mobile text-text_prymery">Bank card</span>
                  <div className="size-6">
                    <IconBankCard />
                  </div>
                </FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0 p-4 border-solid border-b border-gray_1 last:border-b-0">
                <FormControl>
                  <RadioGroupItem value="on_boarding" />
                </FormControl>
                <FormLabel className="font-normal w-full cursor-pointer flex items-center space-x-3">
                  <span className="button_mobile text-text_prymery">Payment upon boarding</span>
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
