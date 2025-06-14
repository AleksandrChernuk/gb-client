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
import ViewPassword from '@/components/shared/ViewPassword';
import { passwordProfieUpdateSchema } from '@/schemas/profile.schemas';
import FormActions from './FormActions';

export default function PasswordUpdateForm() {
  const t = useTranslations(MESSAGE_FILES.FORM);
  const [isInputEnabled, setIsInputEnabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isViewPassword, setIsViewPassword] = useState(false);
  const [isViewNewPassword, setIsViewNewPassword] = useState(false);

  const form = useForm<z.infer<typeof passwordProfieUpdateSchema>>({
    resolver: zodResolver(passwordProfieUpdateSchema),
    defaultValues: {
      password: '',
      new_password: '',
      confirm_new_password: '',
    },
  });

  const onSubmit = async (value: z.infer<typeof passwordProfieUpdateSchema>) => {
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
              name="password"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>{t('password')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={!isInputEnabled || isSubmitting}
                      type="text"
                      placeholder={t('password_placeholder')}
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
              name="new_password"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>{t('new_password')}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        disabled={!isInputEnabled || isSubmitting}
                        type={!isViewPassword ? 'password' : 'text'}
                        placeholder="******"
                        autoComplete="off"
                        aria-invalid={Boolean(fieldState?.invalid)}
                      />
                      <ViewPassword
                        error={Boolean(fieldState?.error)}
                        isViewPassword={isViewPassword}
                        setIsViewPassword={() => setIsViewPassword((prev) => !prev)}
                      />
                    </div>
                  </FormControl>
                  {Boolean(fieldState?.error) && (
                    <FormErrorMassege>{t(`${fieldState.error?.message}`)}</FormErrorMassege>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm_new_password"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>{t('confirm_new_password')}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        disabled={!isInputEnabled || isSubmitting}
                        type={!isViewNewPassword ? 'password' : 'text'}
                        placeholder="******"
                        autoComplete="off"
                        aria-invalid={Boolean(fieldState?.invalid)}
                      />
                      <ViewPassword
                        error={Boolean(fieldState?.error)}
                        isViewPassword={isViewNewPassword}
                        setIsViewPassword={() => setIsViewNewPassword((prev) => !prev)}
                      />
                    </div>
                  </FormControl>
                  {Boolean(fieldState?.error) && (
                    <FormErrorMassege>{t(`${fieldState.error?.message}`)}</FormErrorMassege>
                  )}
                </FormItem>
              )}
            />
            <FormActions
              isInputEnabled={isInputEnabled}
              setIsInputEnabled={handleSetEnabled}
              isSubmitting={isSubmitting}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
