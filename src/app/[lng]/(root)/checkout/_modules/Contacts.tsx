'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function Contacts() {
  const { control } = useFormContext();
  const t = useTranslations(MESSAGE_FILES.FORM);

  return (
    <div className="flex flex-col gap-4 tablet:flex-row">
      <div className="w-full tablet:w-1/2">
        <FormField
          control={control}
          name={`email`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-normal tracking-normal leading-[21px] mb-2">Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" placeholder="Email" />
              </FormControl>
              <FormMessage />
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
              <FormLabel>{t('phone_number')}</FormLabel>
              <FormControl>
                <PhoneInput {...field} defaultCountry="UA" international limitMaxLength />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
