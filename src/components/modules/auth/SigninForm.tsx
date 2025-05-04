'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CircleAlert, LoaderCircle } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import ViewPassword from '@/components/shared/ViewPassword';
import FormError from '@/components/shared/FormError';
import { signinSchema } from '@/schemas/auth.schema';
import { FormErrorMassege } from '@/components/ui/form-error';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { signin } from '@/services/authService';
import { useRouter } from '@/i18n/routing';
import { useUserStore } from '@/store/useStore';

const SigninForm = () => {
  const t = useTranslations(MESSAGE_FILES.COMMON);
  const locale = useLocale();
  const router = useRouter();

  const [error, setError] = useState<string | undefined>('');
  const [isPending, setIsPending] = useState(false);
  const [isViewPassword, setIsViewPassword] = useState(false);

  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof signinSchema>) => {
    try {
      setIsPending(true);
      const result = await signin(values, locale);

      const { message, currentUser } = result;

      if (message === '2FA code sent') {
        router.push(`/auth/otp-verify/${result.email}`);
        form.reset();
        return;
      }

      if (message === 'Successfully signin') {
        useUserStore.getState().setUserStore(currentUser);

        router.push('/profile');
        form.reset();
      }
    } catch (error) {
      setIsPending(false);

      if (error instanceof Error) {
        setError(`Signin failed: ${error.message}`);
      } else {
        setError(`Signin failed: ${String(error)}`);
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
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
                      disabled={isPending}
                      type="email"
                      placeholder="user@example.com"
                      aria-invalid={Boolean(fieldState?.invalid)}
                      autoComplete="off"
                    />
                    {Boolean(fieldState?.invalid) && (
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
        </div>

        <FormError message={error} />

        <Button
          type="submit"
          className="w-full py-[14px] px-6  tablet:py-4 text-white rounded-full text-base font-bold leading-6 tracking-normal max-h-[48px] tablet:max-h-[52px] "
          disabled={isPending}
        >
          {isPending ? <LoaderCircle className="animate-spin" stroke="white" /> : t('signinTitle')}
        </Button>
      </form>
    </Form>
  );
};

export default SigninForm;
