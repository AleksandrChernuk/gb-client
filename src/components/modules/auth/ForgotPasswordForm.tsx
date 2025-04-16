'use client';

import FormError from '@/components/shared/FormError';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { ResetPasswordShema } from '@/schemas/reset.password.shema';

export default function ForgotPasswordForm() {
  //   const t = useTranslations('common');

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
    } catch (error) {
      console.error('Error sending password reset email', error);
      setError(error as string);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-4">
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    placeholder="johndoe@mail.com"
                    type="email"
                    autoComplete="email"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={error} />
          <Button
            type="submit"
            className="w-full py-[14px] px-6  tablet:py-4 text-white rounded-full text-base font-bold leading-6 tracking-normal max-h-[48px] tablet:max-h-[52px] "
            disabled={isPending}
          >
            Send Reset Link
          </Button>
        </div>
      </form>
    </Form>
  );
}
