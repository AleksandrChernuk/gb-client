'use client';

import { Form, FormControl, FormField, FormItem, FormLabel } from '@/shared/ui/form';
import { Button } from '@/shared/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useRouter } from '@/shared/i18n/routing';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/shared/ui/input';
import { useLocale, useTranslations } from 'next-intl';
import { CircleAlert } from 'lucide-react';
import { FormErrorMassege } from '@/shared/ui/form-error';

import { TypeForgotPassword } from '@/shared/types/auth.types';
import { forgotPassword } from '@/shared/api/auth.service';
import { toast } from 'sonner';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { forgotPasswordSchema } from '@/shared/validation/auth.schema';
import { REDIRECT_PATHS } from '@/shared/configs/redirectPaths';
import { mapServerError } from '@/shared/errors/mapServerError';

export default function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations(MESSAGE_FILES.FORM);

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (rowData: z.infer<typeof forgotPasswordSchema>) => {
    setIsLoading(true);
    try {
      const payload: TypeForgotPassword = { email: rowData.email };
      await forgotPassword(payload, locale);

      router.push(`/${REDIRECT_PATHS.resetPassword}?email=${encodeURIComponent(rowData.email)}`);
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
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>{t('e_mail')}</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value.trim().toLocaleLowerCase());
                    }}
                    type="email"
                    placeholder={t('e_mail_placeholder')}
                    autoComplete="off"
                    aria-invalid={Boolean(fieldState?.invalid)}
                  />
                  {Boolean(fieldState?.error) && (
                    <div className="absolute inset-y-0 flex items-center cursor-pointer pointer-events-none right-4">
                      <CircleAlert className="stroke-[#de2a1a]" />
                    </div>
                  )}
                </div>
              </FormControl>
              {Boolean(fieldState?.error) && <FormErrorMassege>{t(`${fieldState.error?.message}`)}</FormErrorMassege>}
            </FormItem>
          )}
        />

        <div>
          <Button
            type="submit"
            variant={'default'}
            size={'primary'}
            disabled={isLoading || !form.formState.isValid}
            className="w-full"
          >
            {t('send')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
