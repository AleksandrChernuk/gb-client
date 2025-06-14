'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';
import { FormErrorMassege } from '@/components/ui/form-error';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { personalDataSchema } from '@/schemas/profile.schemas';
import { useUserStore } from '@/store/useStore';
import FormActions from './FormActions';

export default function PersonalDataForm() {
  const t = useTranslations(MESSAGE_FILES.FORM);
  const [isInputEnabled, setIsInputEnabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const user = useUserStore((state) => state.currentUser);

  const form = useForm<z.infer<typeof personalDataSchema>>({
    resolver: zodResolver(personalDataSchema),
    defaultValues: {
      first_name: user ? user?.userName : '',
      last_name: '',
      middlename: '',
    },
  });

  const onSubmit = async (value: z.infer<typeof personalDataSchema>) => {
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
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>{t('first_name')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={!isInputEnabled || isSubmitting}
                      type="text"
                      placeholder={t('first_name_placeholder')}
                      autoComplete="off"
                      aria-invalid={Boolean(fieldState?.invalid)}
                    />
                  </FormControl>
                  {Boolean(fieldState?.error) && (
                    <FormErrorMassege>{t(`${fieldState.error?.message}`)}</FormErrorMassege>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>{t('last_name')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={!isInputEnabled || isSubmitting}
                      type="text"
                      placeholder={t('last_name_placeholder')}
                      autoComplete="off"
                      aria-invalid={Boolean(fieldState?.invalid)}
                    />
                  </FormControl>
                  {Boolean(fieldState?.error) && (
                    <FormErrorMassege>{t(`${fieldState.error?.message}`)}</FormErrorMassege>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="middlename"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>{t('middlename')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={!isInputEnabled || isSubmitting}
                      type="email"
                      placeholder={t('middlename_placeholder')}
                      autoComplete="off"
                      aria-invalid={Boolean(fieldState?.invalid)}
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
