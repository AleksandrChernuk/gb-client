'use client';

import { CustomCard } from '@/components/shared/CustomCard';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from "@/components/ui/input";
import { useFieldArray, useFormContext } from "react-hook-form";
import { TPassenger } from "@/types/checkout-from.types";
import { useTranslations } from "next-intl";
import StepNumber from "../../components/StepNumber";
import { withMask } from "use-mask-input";

export default function Passengers() {
  const { control } = useFormContext();
  const t = useTranslations("new_order");

  const { fields } = useFieldArray({
    name: "passengers",
    control: control,
  });

  return (
    <ul className="space-y-2">
      <li className="flex items-center gap-2 ">
        <StepNumber step={1} />
        <h3 className="h5 tablet:h4 text-text_prymery">{t("passengers")}</h3>
      </li>
      <li className="space-y-4">
        {fields.map((field, i) => {
          const passenger = field as unknown as TPassenger;
          return (
            <CustomCard key={passenger.id} className="space-y-4 dark:bg-dark_main">
              <div className="flex flex-col gap-4 tablet:flex-row">
                <div className="w-full tablet:w-1/2">
                  <FormField
                    control={control}
                    name={`passengers.${i}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-text_prymery">Name</FormLabel>
                        <FormControl>
                          <Input {...field} type="text" />
                        </FormControl>
                        <FormMessage className="text-red" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-full tablet:w-1/2">
                  <FormField
                    control={control}
                    name={`passengers.${i}.surname`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-text_prymery">Surname</FormLabel>
                        <FormControl>
                          <Input {...field} type="text" />
                        </FormControl>
                        <FormMessage className="text-red" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4 tablet:flex-row">
                <div className="w-full tablet:w-1/2">
                  <FormField
                    control={control}
                    name={`passengers.${i}.notes`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-text_prymery">Notes</FormLabel>
                        <FormControl>
                          <Input {...field} type="text" />
                        </FormControl>
                        <FormMessage className="text-red" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-full tablet:w-1/2">
                  <FormField
                    control={control}
                    name={`passengers.${i}.dob`}
                    render={({ field }) => {
                      console.log(field.value);
                      return (
                        <FormItem>
                          <FormLabel className="text-text_prymery">Notes</FormLabel>
                          <Input
                            {...field}
                            type="text"
                            ref={withMask("99.99.9999", { showMaskOnFocus: true, showMaskOnHover: false })}
                            placeholder="дд.мм.гггг"
                            autoComplete="off"
                            autoSave="off"
                          />
                          <FormMessage className="text-red" />
                        </FormItem>
                      );
                    }}
                  />
                </div>
              </div>
            </CustomCard>
          );
        })}
      </li>
    </ul>
  );
}
