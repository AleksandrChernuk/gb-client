'use client';

import { verifyEmail } from '@/shared/api/auth.service';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/shared/ui/form';
import { FormErrorMassege } from '@/shared/ui/form-error';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/shared/ui/input-otp';

import { useUserStore } from '@/shared/store/useUser';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
import { toast } from 'sonner';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { useRouter } from '@/shared/i18n/routing';
import { verify2FASchema } from '@/shared/validation/auth.schema';
import { mapServerError } from '@/shared/errors/mapServerError';
import { REDIRECT_PATHS } from '@/shared/configs/redirectPaths';
import ResendCode from '@/entities/auth/ResendCode';

export default function VerifyEmailFrom({ email }: { email: string }) {
  const locale = useLocale();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const t = useTranslations(MESSAGE_FILES.FORM);

  const form = useForm<z.infer<typeof verify2FASchema>>({
    resolver: zodResolver(verify2FASchema),
    defaultValues: {
      code: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (rowData: z.infer<typeof verify2FASchema>) => {
    try {
      const result = await verifyEmail({ email: decodeURIComponent(email || ''), code: rowData.code }, locale);

      const { message, currentUser } = result;

      if (message !== 'Successfully signin' || !currentUser) {
        toast.error(mapServerError(''));
        setIsLoading(false);
        form.reset();
        return;
      }

      useUserStore.getState().setUserStore(currentUser);
      router.replace(`/${REDIRECT_PATHS.profile}`);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        form.reset();
        setIsLoading(false);
      } else {
        toast.error(String(error));
        form.reset();
        setIsLoading(false);
      }
    }
  };
  return (
    <Form {...form}>
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
        <div className="w-full">
          <ResendCode disabled={isLoading} email={email} locale={locale} type="VERIFICATION" />
        </div>
      </form>
    </Form>
  );
}
