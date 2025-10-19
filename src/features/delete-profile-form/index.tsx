'use client';

import { confirmDeleteAccount } from '@/shared/api/auth.service';
import { Button } from '@/shared/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/shared/ui/form';
import { FormErrorMassege } from '@/shared/ui/form-error';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/shared/ui/input-otp';
import { useUserStore } from '@/shared/store/useUser';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { useRouter } from '@/shared/i18n/routing';
import { verify2FASchema } from '@/shared/validation/auth.schema';
import { REDIRECT_PATHS } from '@/shared/configs/redirectPaths';
import { mapServerError } from '@/shared/errors/mapServerError';
import ResendCode from '@/entities/auth/ResendCode';
import { LoadingScreen } from '@/shared/ui/loading-screen';

export default function VerifyDeleteAccountForm() {
  const locale = useLocale();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations(MESSAGE_FILES.FORM);

  const { currentUser, clearUserStore } = useUserStore();
  const param = useSearchParams();
  const email = param?.get('email') || currentUser?.email || '';

  const form = useForm<z.infer<typeof verify2FASchema>>({
    resolver: zodResolver(verify2FASchema),
    defaultValues: {
      code: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (rowData: z.infer<typeof verify2FASchema>) => {
    setIsLoading(true);

    try {
      await confirmDeleteAccount({ code: rowData.code, email }, locale);

      clearUserStore();

      router.replace(`/${REDIRECT_PATHS.confirmDeleteAccount}`);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(t(`${mapServerError(err.message)}`));
        form.reset();
        setIsLoading(false);
      } else {
        toast.error(t(`${mapServerError('')}`));
        form.reset();
        setIsLoading(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      {isLoading && <LoadingScreen />}

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="w-full  ">
          <FormField
            control={form.control}
            name="code"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="sr-only">{t('confirmation_code')}</FormLabel>
                <FormControl>
                  <div className="w-full flex justify-center">
                    <InputOTP
                      maxLength={6}
                      value={field.value}
                      onChange={(value: string) => {
                        const digits = value.replace(/\D+/g, '');
                        field.onChange(digits);

                        if (digits.length === 6) {
                          form.handleSubmit(onSubmit)();
                        }
                      }}
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
                {Boolean(fieldState?.error) && <FormErrorMassege>{t(`${fieldState.error?.message}`)}</FormErrorMassege>}
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="w-full">
            <Button type="submit" disabled={isLoading || !form.formState.isValid} variant={'default'} size={'primary'}>
              {isLoading ? <LoaderCircle className="animate-spin" stroke="white" /> : t('delete_account')}
            </Button>

            <ResendCode disabled={isLoading} email={email} locale={locale} type="DELETE_ACCOUNT" className="mt-6" />
          </div>
        </div>
      </form>
    </Form>
  );
}
