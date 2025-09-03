'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useTranslations } from 'next-intl';
import { FormErrorMassege } from '@/components/ui/form-error';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { PhoneInput } from '@/components/ui/phone-input';
import FormActions from './FormActions';
import { profilePhoneForm } from '@/schemas/profile.schemas';

export default function PhoneForm() {
  const t = useTranslations(MESSAGE_FILES.FORM);
  const [isInputEnabled, setIsInputEnabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(profilePhoneForm),
    defaultValues: {
      phone: '',
    },
  });

  const onSubmit = async (value: z.infer<typeof profilePhoneForm>) => {
    console.log('Submit start');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsInputEnabled(false);
      setIsSubmitting(false);
    }, 2000);

    console.log(value);
  };

  const handleSetEnabled = (v: boolean) => {
    if (v) {
      setIsInputEnabled(true);
    } else {
      setIsInputEnabled(false);
      form.reset();
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>{t('phone_number')}</FormLabel>
                  <FormControl>
                    <PhoneInput
                      {...field}
                      disabled={!isInputEnabled || isSubmitting}
                      error={!!fieldState.error}
                      defaultCountry="UA"
                      international
                      limitMaxLength
                    />
                  </FormControl>
                  {Boolean(fieldState?.error) && (
                    <FormErrorMassege>{t(`${fieldState.error?.message}`)}</FormErrorMassege>
                  )}
                </FormItem>
              )}
            />
          </div>

          <FormActions
            isInputEnabled={isInputEnabled}
            setIsInputEnabled={handleSetEnabled}
            isSubmitting={isSubmitting}
          />
        </form>
      </Form>
    </div>
  );
}
