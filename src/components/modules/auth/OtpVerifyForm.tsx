'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useState } from 'react';
import FormError from '@/components/shared/FormError';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { FormErrorMassege } from '@/components/ui/form-error';
import { LoaderCircle } from 'lucide-react';
import { otpVerifySchema } from '@/schemas/auth.schema';
import { useUserStore } from '@/store/useUser';
import { useParams } from 'next/navigation';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { verifyEmail } from '@/actions/auth.service';
import { toast } from 'sonner';

export default function OtpVerifyForm() {
  const route = useRouter();
  const params = useParams<{ tag: string; email: string }>();
  const email = decodeURIComponent(params?.email || '');
  const t = useTranslations(MESSAGE_FILES.COMMON);

  const [error, setError] = useState<string | undefined>('');
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof otpVerifySchema>>({
    resolver: zodResolver(otpVerifySchema),
    defaultValues: {
      pin: '',
    },
  });

  const onSubmit = async (value: z.infer<typeof otpVerifySchema>) => {
    try {
      setIsPending(true);
      const result = await verifyEmail({ email, code: value.pin });

      const { message, currentUser } = result;

      if (message !== 'Successfully signin' || !currentUser) {
        toast.error('Invalid server response');
        setIsPending(false);
        form.reset();
        return;
      }

      useUserStore.getState().setUserStore(currentUser);
      route.push(`/profile`, { scroll: true });
    } catch (error) {
      setIsPending(false);

      if (error instanceof Error) {
        setError(`Verification failed: ${error.message}`);
      } else {
        setError(`Verification failed: ${String(error)}`);
      }
    } finally {
      setIsPending(false);
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
          variant={'default'}
          size={'primery'}
          disabled={isPending}
          className="w-full text-white rounded-full text-base font-bold leading-6 tracking-normal"
        >
          {isPending ? <LoaderCircle className="animate-spin" stroke="white" /> : t('otpVerifyCode')}
        </Button>
      </form>
    </Form>
  );
}
