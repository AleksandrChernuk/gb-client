'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { PhoneInput } from '@/components/ui/phone-input';

export default function Contacts() {
  const { control } = useFormContext();

  return (
    <div className='flex flex-col gap-4 tablet:flex-row'>
      <div className='w-full tablet:w-1/2'>
        <FormField
          control={control}
          name={`email`}
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
          name='phone'
          render={({ field }) => (
            <FormItem className='grid gap-2'>
              <FormLabel htmlFor='phone'>Phone Number</FormLabel>
              <FormControl>
                <PhoneInput {...field} defaultCountry='UA' />
                {/* <Input
                          id="phone"
                          placeholder="555-123-4567"
                          type="tel"
                          autoComplete="tel"
                          {...field}
                        /> */}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
