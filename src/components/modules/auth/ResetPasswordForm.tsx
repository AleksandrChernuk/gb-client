'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { resetPassword } from '@/actions/auth.service';
import { REDIRECT_PATHS } from '@/config/redirectPaths';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { resetPasswordSchema } from '@/schemas/auth.schema';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import ViewPassword from '@/components/shared/ViewPassword';
import { LoaderCircle } from 'lucide-react';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { FormErrorMassege } from '@/components/ui/form-error';
import ResendCode from '@/components/modules/auth/ResendCode';
import { mapServerError } from '@/utils/mapServerError';
import { toast } from 'sonner';
import { useRouter } from '@/i18n/routing';

export default function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isViewPassword, setIsViewPassword] = useState(false);
  const t = useTranslations(MESSAGE_FILES.FORM);
  const locale = useLocale();

  const router = useRouter();
  const param = useSearchParams();
  const email = param.get('email');

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      code: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (rowData: z.infer<typeof resetPasswordSchema>) => {
    setIsLoading(true);

    const data = { code: rowData.code, newPassword: rowData.password };

    try {
      await resetPassword(data, locale);
      router.replace(`/${REDIRECT_PATHS.signin}`);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(t(`${mapServerError(err.message)}`));
        form.reset();
      } else {
        //default error
        toast.error(t(`${mapServerError('')}`));
        form.reset();
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col gap-4 w-full max-w-[380px] mx-auto">
          <div className="w-full">
            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>{t('new_password')}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        disabled={form.formState.isSubmitting}
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
                    <FormErrorMassege>{t(`${fieldState.error?.message}`)}</FormErrorMassege>
                  )}
                </FormItem>
              )}
            />
          </div>
          <div className="w-full">
            <FormField
              control={form.control}
              name="code"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>{t('confirmation_code')}</FormLabel>
                  <FormControl>
                    <div className="w-full flex justify-center">
                      <InputOTP
                        maxLength={6}
                        value={field.value}
                        onChange={(value) => field.onChange(value.replace(/\D+/g, ''))}
                        disabled={isLoading}
                        className="w-full"
                      >
                        <InputOTPGroup className="w-full">
                          <InputOTPSlot index={0} className="size-10" />
                          <InputOTPSlot index={1} className="size-10" />
                          <InputOTPSlot index={2} className="size-10" />
                          <InputOTPSlot index={3} className="size-10" />
                          <InputOTPSlot index={4} className="size-10" />
                          <InputOTPSlot index={5} className="size-10" />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </FormControl>
                  {Boolean(fieldState?.error) && (
                    <FormErrorMassege>{t(`${fieldState.error?.message}`)}</FormErrorMassege>
                  )}
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex flex-col tablet:flex-row gap-2">
          {email && <ResendCode email={email} locale={locale} type="RESET_PASSWORD" />}

          <div className="w-full">
            <Button type="submit" disabled={isLoading || !form.formState.isValid} variant={'default'} size={'primary'}>
              {isLoading ? <LoaderCircle className="animate-spin" stroke="white" /> : t('change_button')}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
