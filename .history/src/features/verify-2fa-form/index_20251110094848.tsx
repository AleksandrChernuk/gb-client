'use client';

import { useLocale, useTranslations } from 'next-intl';
import { verify2FA } from '@/shared/api/auth.service';
import { useUserStore } from '@/shared/store/useUser';
import ResendCode from '@/entities/auth/ResendCode';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/shared/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/shared/ui/input-otp';
import { FormErrorMassege } from '@/shared/ui/form-error';
import { toast } from 'sonner';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { useRouter } from '@/shared/i18n/routing';
import { verify2FASchema } from '@/shared/validation/auth.schema';
import { mapServerError } from '@/shared/errors/mapServerError';
import { REDIRECT_PATHS } from '@/shared/configs/redirectPaths';
import { LoadingScreen } from '@/shared/ui/loading-screen';

type Props = {
  email: string;
};

const Verify2FAForm = ({ email }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const setUserStore = useUserStore((s) => s.setUserStore);
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

  const onSubmit = async (data: z.infer<typeof verify2FASchema>) => {
    setIsLoading(true);

    try {
      const result = await verify2FA({ email: decodeURIComponent(email) || '', code: data.code }, locale);
      const { message, currentUser } = result;

      if (message !== 'Successfully signin' || !currentUser) {
        toast.error(t(`${mapServerError('')}`));
        setIsLoading(false);
        form.reset();
        return;
      }

      setUserStore(currentUser);
      form.reset();
      router.replace(`${REDIRECT_PATHS.profile}`);
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
        <div className="w-full">
          {email && <ResendCode loading={isLoading} email={email} locale={locale} type="TWO_FACTOR" />}
        </div>
      </form>
    </Form>
  );
};

export default Verify2FAForm;
