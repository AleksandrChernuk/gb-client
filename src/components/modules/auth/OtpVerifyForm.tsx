'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useState, useTransition } from 'react';
import FormError from '@/components/shared/FormError';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { FormErrorMassege } from '@/components/ui/form-error';
import { LoaderCircle } from 'lucide-react';
import { otpVerifySchema } from '@/schemas/auth.schema';
import { useUserStore } from '@/store/useStore';
import { verifyEmail } from '@/services/authService';
import { useParams } from 'next/navigation';
import { MESSAGE_FILES } from '@/constans/message.file.constans';

export default function OtpVerifyForm() {
  const route = useRouter();
  const params = useParams<{ tag: string; email: string }>();
  const email = decodeURIComponent(params?.email || '');
  const t = useTranslations(MESSAGE_FILES.COMMON);

  const [error, setError] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof otpVerifySchema>>({
    resolver: zodResolver(otpVerifySchema),
    defaultValues: {
      pin: '',
    },
  });

  const onSubmit = async (value: z.infer<typeof otpVerifySchema>) => {
    try {
      const result = await verifyEmail({ email, code: value.pin });

      const { message, currentUser } = result;

      if (message !== 'Successfully signin' || !currentUser) {
        throw new Error('Invalid server response');
      }

      useUserStore.getState().setUserStore(currentUser);
      startTransition(() => {
        route.push(`/profile`);
      });
    } catch (error) {
      if (error instanceof Error) {
        setError(`Verification failed: ${error.message}`);
      } else {
        setError(`Verification failed: ${String(error)}`);
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="pin"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <InputOTP maxLength={6} {...field} inputMode="numeric">
                  <InputOTPGroup className=" justify-center w-full">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              {Boolean(fieldState?.error) && (
                <FormErrorMassege className="text-center">
                  {t(`otp_validate.${fieldState.error?.message}`)}
                </FormErrorMassege>
              )}
              <FormDescription className="text-center text-sm">{t('otpVerifyText')}</FormDescription>
            </FormItem>
          )}
        />

        <FormError message={error} />

        <Button
          type="submit"
          disabled={isPending}
          className="w-full py-[14px] px-6 tablet:py-4 text-white rounded-full text-base font-bold leading-6 tracking-normal max-h-[48px] tablet:max-h-[52px]"
        >
          {isPending ? <LoaderCircle className="animate-spin" stroke="white" /> : t('otpVerifyCode')}
        </Button>
      </form>
    </Form>
  );
}
