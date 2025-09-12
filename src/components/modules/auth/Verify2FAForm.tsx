'use client';

import { useLocale, useTranslations } from 'next-intl';
import { verify2FA } from '@/actions/auth.service';
import { useUserStore } from '@/store/useUser';
import { REDIRECT_PATHS } from '@/config/redirectPaths';
import ResendCode from '@/components/modules/auth/ResendCode';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { verify2FASchema } from '@/schemas/auth.schema';
import { z } from 'zod';
import { useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { FormErrorMassege } from '@/components/ui/form-error';
import { toast } from 'sonner';
import { mapServerError } from '@/utils/mapServerError';
import { useRouter } from '@/i18n/routing';

const Verify2FAForm = ({ email }: { email: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const locale = useLocale();
  const t = useTranslations(MESSAGE_FILES.FORM);
  const router = useRouter();

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
      const result = await verify2FA({ email: decodeURIComponent(email || ''), code: rowData.code }, locale);

      const { message, currentUser } = result;

      if (message !== 'Successfully signin' || !currentUser) {
        toast.error(t(`${mapServerError('')}`));
        setIsLoading(false);
        form.reset();
        return;
      }

      useUserStore.getState().setUserStore(currentUser);
      form.reset();
      router.push(REDIRECT_PATHS.profile);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(t(`${mapServerError(error.message)}`));
        form.reset();
        setIsLoading(false);
      } else {
        toast.error(t(`${mapServerError('')}`));
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
        <div className="w-full">{email && <ResendCode email={email} locale={locale} type="RESET_PASSWORD" />}</div>
      </form>
    </Form>
  );
};

export default Verify2FAForm;
