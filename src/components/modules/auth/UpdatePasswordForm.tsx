'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import ViewPassword from '@/components/shared/ViewPassword';
import FormError from '@/components/shared/FormError';
import { FormErrorMassege } from '@/components/ui/form-error';
import { updatePpasswordSchema } from '@/schemas/update.password.schema';
import { useRouter } from 'next/navigation';
import { LoaderCircle } from 'lucide-react';

const UpdatePasswordForm = () => {
  const route = useRouter();

  const t = useTranslations('common');

  const [error, setError] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();
  const [isViewPassword, setIsViewPassword] = useState(false);

  const form = useForm<z.infer<typeof updatePpasswordSchema>>({
    resolver: zodResolver(updatePpasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof updatePpasswordSchema>) {
    try {
      console.log(values);
      startTransition(() => {
        route.push('/signin');
      });
    } catch (error) {
      console.error('Error sending password reset email', error);
      setError(error as string);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
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
                      aria-invalid={Boolean(fieldState?.invalid)}
                      autoComplete="off"
                    />
                    <ViewPassword
                      error={Boolean(fieldState?.error)}
                      isViewPassword={isViewPassword}
                      setIsViewPassword={() => setIsViewPassword((prev) => !prev)}
                    />
                  </div>
                </FormControl>
                {Boolean(fieldState?.error) && (
                  <FormErrorMassege>{t(`password_validate.${fieldState.error?.message}`)}</FormErrorMassege>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>{t('confirmPassword')}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      disabled={isPending}
                      type={!isViewPassword ? 'password' : 'text'}
                      aria-invalid={Boolean(fieldState?.invalid)}
                      autoComplete="off"
                    />
                  </div>
                </FormControl>
                {Boolean(fieldState?.error) && (
                  <FormErrorMassege>{t(`updatePassword_validate.${fieldState.error?.message}`)}</FormErrorMassege>
                )}
              </FormItem>
            )}
          />
        </div>

        <FormError message={error} />

        <Button type="submit" size={'primery'} disabled={isPending}>
          {isPending ? <LoaderCircle className="animate-spin" stroke="white" /> : t('updatePasswordBtn')}
        </Button>
      </form>
    </Form>
  );
};

export default UpdatePasswordForm;
