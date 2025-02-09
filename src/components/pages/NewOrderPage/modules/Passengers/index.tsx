'use client';

import { CustomCard } from '@/components/shared/CustomCard';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { CircleAlert } from 'lucide-react';
import { TPassenger } from '@/types/checkout-from.types';

export default function Passengers() {
  const { control } = useFormContext();

  const { fields } = useFieldArray({
    name: 'passengers',
    control: control,
  });

  return (
    <ul className='space-y-2'>
      <li className='flex items-center gap-2 '>
        <div className='w-10 h-10 p-2 font-bold text-center text-white rounded-xl bg-primary'>
          1
        </div>
        <h3 className='h4 text-text_prymery_color'>Passengers</h3>
      </li>
      <li className='space-y-4'>
        {fields.map((field, i) => {
          const passenger = field as unknown as TPassenger;
          return (
            <CustomCard key={passenger.id} className='space-y-4 dark:bg-dark_mode_main1'>
              <div>{passenger.isChildren ? `${i + 1} Дитячий` : `${i + 1} Дорослий`}</div>
              <div className='flex flex-col gap-4 tablet:flex-row'>
                <div className='w-full tablet:w-1/2'>
                  <FormField
                    control={control}
                    name={`passengers.${i}.name`}
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel className='text-text_prymery_color'>Name</FormLabel>
                        <FormControl>
                          <div className='relative'>
                            <Input
                              {...field}
                              type='text'
                              className={`${
                                fieldState?.invalid &&
                                'border-red focus:border-red bg-red_input placeholder:text-red dark:bg-background_black_mode'
                              }`}
                            />
                            {fieldState?.invalid && (
                              <div className='absolute inset-y-0 flex items-center right-4'>
                                <CircleAlert className='stroke-red' />
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage className='text-red' />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='w-full tablet:w-1/2'>
                  <FormField
                    control={control}
                    name={`passengers.${i}.surname`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-text_prymery_color'>Surname</FormLabel>
                        <FormControl>
                          <Input {...field} type='text' />
                        </FormControl>
                        <FormMessage className='text-red' />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className='flex flex-col gap-4 tablet:flex-row'>
                <div className='w-full tablet:w-1/2'>
                  <FormField
                    control={control}
                    name={`passengers.${i}.notes`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-text_prymery_color'>Notes</FormLabel>
                        <FormControl>
                          <Input {...field} type='text' />
                        </FormControl>
                        <FormMessage className='text-red' />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='w-full tablet:w-1/2'>
                  <FormField
                    control={control}
                    name={`passengers.${i}.birthday`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-text_prymery_color'>Date of birth</FormLabel>
                        <FormControl>
                          <Input {...field} type='date' className='w-full' />
                        </FormControl>
                        <FormMessage className='text-red' />
                      </FormItem>
                    )}
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
