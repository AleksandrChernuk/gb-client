'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createSigninSchema } from '@/schemas/auth-schemas';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CircleAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ViewPassword from '@/components/shared/ViewPassword';
import FormError from '@/components/shared/FormError';
import { Link } from '@/i18n/routing';

const SigninForm = () => {
  const t = useTranslations('common');

  const SigninSchema = createSigninSchema(t);

  const [error, setError] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();
  const [isViewPassword, setIsViewPassword] = useState(false);

  const form = useForm<z.infer<typeof SigninSchema>>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof SigninSchema>) => {
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
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="mb-2 text-sm font-normal tracking-normal leading-[21px] text-slate-700 dark:text-white">
                  {t('authEmail')}
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      disabled={isPending}
                      type="email"
                      placeholder="user@example.com"
                      className={`${
                        Boolean(fieldState?.error) &&
                        'border-red-50 focus:border-red-50 bg-red-100 placeholder:text-red-50  dark:bg-slate-900'
                      }`}
                    />
                    {Boolean(fieldState?.invalid) && (
                      <div className="absolute inset-y-0 flex items-center cursor-pointer pointer-events-none right-4">
                        <CircleAlert className="stroke-red-50" />
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage className="text-red-50" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem>
                <div className="flex items-center justify-between mb-2">
                  <FormLabel className="text-sm font-normal tracking-normal leading-[21px] text-slate-700 dark:text-white">
                    {t('authPassword')}
                  </FormLabel>
                  <Button asChild variant={'link'}>
                    <Link prefetch={false} href="/forgot-password">
                      Forgot password
                    </Link>
                  </Button>
                </div>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      disabled={isPending}
                      type={!isViewPassword ? 'password' : 'text'}
                      placeholder="******"
                      className={`${
                        Boolean(fieldState?.error) &&
                        'border-red-50 focus:border-red-50  bg-red-100 placeholder:text-red-50 dark:bg-slate-900'
                      }`}
                    />
                    <ViewPassword
                      error={Boolean(fieldState?.error)}
                      isViewPassword={isViewPassword}
                      setIsViewPassword={() => setIsViewPassword((prev) => !prev)}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-50" />
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

export default SigninForm;
