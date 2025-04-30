'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { Button } from '@/components/ui/button';
import { CircleAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ViewPassword from '@/components/shared/ViewPassword';
import FormError from '@/components/shared/FormError';
import { signupSchema } from '@/schemas/auth.schemas';
import { FormErrorMassege } from '@/components/ui/form-error';

const SignupForm = () => {
  const t = useTranslations('common');

  const [error, setError] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();
  const [isViewPassword, setIsViewPassword] = useState(false);

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      userName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof signupSchema>) => {
    console.log(values);
    setError('');

    startTransition(() => {});
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="userName"
            render={({ field, fieldState }) => {
              return (
                <FormItem>
                  <FormLabel className="mb-2 text-sm font-normal tracking-normal leading-[21px] text-slate-700 dark:text-white">
                    {t('authName')}
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        disabled={isPending}
                        type="text"
                        placeholder={t('placeholderName')}
                        autoComplete="off"
                        aria-invalid={Boolean(fieldState?.invalid)}
                      />
                      {Boolean(fieldState?.invalid) && (
                        <div className="absolute inset-y-0 flex items-center cursor-pointer pointer-events-none right-4">
                          <CircleAlert className="stroke-[#de2a1a]" />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  {Boolean(fieldState?.error) && (
                    <FormErrorMassege>{t(`name_validate.${fieldState.error?.message}`)}</FormErrorMassege>
                  )}
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>{t('authEmail')}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value.trim());
                      }}
                      disabled={isPending}
                      type="email"
                      placeholder="user@example.com"
                      autoComplete="off"
                      aria-invalid={Boolean(fieldState?.invalid)}
                    />
                    {Boolean(fieldState?.error) && (
                      <div className="absolute inset-y-0 flex items-center cursor-pointer pointer-events-none right-4">
                        <CircleAlert className="stroke-[#de2a1a]" />
                      </div>
                    )}
                  </div>
                </FormControl>
                {Boolean(fieldState?.error) && (
                  <FormErrorMassege>{t(`email_validate.${fieldState.error?.message}`)}</FormErrorMassege>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>{t('authPassword')}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      disabled={isPending}
                      type={!isViewPassword ? 'password' : 'text'}
                      placeholder="******"
                      aria-invalid={Boolean(fieldState?.invalid)}
                    />
                    <ViewPassword
                      error={Boolean(fieldState?.error)}
                      isViewPassword={isViewPassword}
                      setIsViewPassword={() => setIsViewPassword((prev) => !prev)}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormError message={error} />

        <Button
          type="submit"
          className="w-full py-[14px] px-6  tablet:py-4 text-white rounded-full text-base font-bold leading-6 tracking-normal max-h-[48px] tablet:max-h-[52px] "
          disabled={isPending}
        >
          {t('signinTitle')}
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;
