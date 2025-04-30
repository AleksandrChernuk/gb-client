'use client';

import FormError from '@/components/shared/FormError';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { LoaderCircle } from 'lucide-react';
import { FormErrorMassege } from '@/components/ui/form-error';
import { ResetPasswordShema } from '@/schemas/auth.schema';

export default function ForgotPasswordForm() {
  const route = useRouter();
  const t = useTranslations('common');

  const [error, setError] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetPasswordShema>>({
    resolver: zodResolver(ResetPasswordShema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof ResetPasswordShema>) {
    try {
      console.log(values);
      startTransition(() => {});
      route.push('/signin/otp-verify');
    } catch (error) {
      console.error('Error sending password reset email', error);
      setError(error as string);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem className="grid gap-2">
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input
                  id="email"
                  placeholder="johndoe@mail.com"
                  type="email"
                  autoComplete="off"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              {Boolean(fieldState?.error) && (
                <FormErrorMassege>{t(`email_validate.${fieldState.error?.message}`)}</FormErrorMassege>
              )}
            </FormItem>
          )}
        />
        <FormError message={error} />
        <Button type="submit" size={'primery'} disabled={isPending}>
          {isPending ? <LoaderCircle className="animate-spin" stroke="white" /> : t('sendResetCode')}
        </Button>
      </form>
    </Form>
  );
}
