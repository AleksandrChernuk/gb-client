'use client';

import { verifyEmail } from '@/actions/auth.service';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { FormErrorMassege } from '@/components/ui/form-error';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { REDIRECT_PATHS } from '@/config/redirectPaths';
import { verify2FASchema } from '@/schemas/auth.schema';
import { useUserStore } from '@/store/useUser';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import ResendCode from './ResendCode';
import { useState } from 'react';
import { toast } from 'sonner';
import { mapServerError } from '@/utils/mapServerError';
import { useRouter } from '@/i18n/routing';

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
        <div className="flex flex-col tablet:flex-row gap-2">
          {email && <ResendCode email={email} locale={locale} type="VERIFICATION" />}

          <div className="w-full">
            <Button type="submit" disabled={isLoading || !form.formState.isValid} variant={'default'} size={'primary'}>
              {isLoading ? <LoaderCircle className="animate-spin" stroke="white" /> : t('confirmation')}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
