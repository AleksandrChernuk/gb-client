'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PhoneInput } from "@/components/ui/phone-input";
import React from "react";
import { useFormContext } from "react-hook-form";

export default function Contacts() {
  const { control } = useFormContext();

  return (
    <div className="flex flex-col gap-4 tablet:flex-row">
      <div className="w-full tablet:w-1/2">
        <FormField
          control={control}
          name={`email`}
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
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <PhoneInput {...field} defaultCountry="UA" international limitMaxLength />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
