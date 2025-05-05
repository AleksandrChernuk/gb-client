'use client';

import { CustomCard } from '@/components/shared/CustomCard';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { TPassenger } from '@/types/checkout-from.types';
import { useTranslations } from 'next-intl';
import { withMask } from 'use-mask-input';
import { Calendar } from 'lucide-react';
import StepNumber from './components/StepNumber';
import Timer from './components/Timer';
import { MESSAGE_FILES } from '@/constans/message.file.constans';

export default function Passengers() {
  const { control } = useFormContext();
  const t_new_order = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);
  const t_forms = useTranslations(MESSAGE_FILES.FORM);

  const { fields } = useFieldArray({
    name: 'passengers',
    control: control,
  });

  return (
    <ul className="space-y-4">
      <li className="flex items-center gap-2">
        <StepNumber step={1} />
        <h3 className="text-base font-bold leading-6 tracking-normal tablet:text-2xl tablet:font-medium tablet:leading-[28.8px] text-slate-700 dark:text-slate-50">
          {t_new_order('passengers')}
        </h3>

        <div className="ml-auto">
          <Timer />
        </div>
      </li>
      <li>
        <ul className="space-y-6">
          {fields.map((field, i) => {
            const passenger = field as unknown as TPassenger;
            return (
              <li key={passenger.id}>
                <CustomCard className="space-y-4 dark:bg-slate-800">
                  <div className="flex flex-col gap-4 tablet:flex-row">
                    <div className="w-full tablet:w-1/2">
                      <FormField
                        control={control}
                        name={`passengers.${i}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="mb-2 text-sm font-normal tracking-normal leading-[21px]">
                              {t_forms('name')}
                            </FormLabel>
                            <FormControl>
                              <Input {...field} type="text" placeholder={t_forms('name_placeholder')} />
                            </FormControl>
                            <FormMessage className="text-red-50" />
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
                            <FormLabel className="mb-2 text-sm font-normal tracking-normal leading-[21px]">
                              {t_forms('surname')}
                            </FormLabel>
                            <FormControl>
                              <Input {...field} type="text" placeholder={t_forms('surname_placeholder')} />
                            </FormControl>
                            <FormMessage className="text-red-50" />
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
                            <FormLabel className="mb-2 text-sm font-normal tracking-normal leading-[21px]">
                              {t_forms('notes')}
                            </FormLabel>
                            <FormControl>
                              <Input {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="w-full tablet:w-1/2">
                      <FormField
                        control={control}
                        name={`passengers.${i}.dob`}
                        render={({ field, fieldState }) => {
                          return (
                            <FormItem>
                              <FormLabel className="mb-2 text-sm font-normal tracking-normal leading-[21px]">
                                {t_forms('dob')}
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    onChange={(value) => {
                                      field.onChange(value);
                                    }}
                                    onBlur={field.onBlur}
                                    type="text"
                                    ref={withMask('99.99.9999', {
                                      showMaskOnFocus: true,
                                      showMaskOnHover: false,
                                    })}
                                    placeholder={t_forms('dob_placeholder')}
                                  />

                                  <Calendar className="absolute -translate-y-1/2 stroke-slate-700 dark:stroke-slate-50 right-5 top-1/2" />
                                </div>
                              </FormControl>

                              {fieldState.invalid && (
                                <span className="text-sm font-medium text-red-50">
                                  {t_forms(fieldState.error?.message || '')}
                                </span>
                              )}
                            </FormItem>
                          );
                        }}
                      />
                    </div>
                  </div>
                </CustomCard>
              </li>
            );
          })}
        </ul>
      </li>
    </ul>
  );
}
