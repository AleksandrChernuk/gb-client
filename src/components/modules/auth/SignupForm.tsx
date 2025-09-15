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
import { signupSchema } from '@/schemas/auth.schema';
import { FormErrorMassege } from '@/components/ui/form-error';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { signup } from '@/actions/auth.service';
import { REDIRECT_PATHS } from '@/config/redirectPaths';
import { mapServerError } from '@/utils/mapServerError';
import { useRouter } from 'next/navigation';

const SignupForm = () => {
  const t = useTranslations(MESSAGE_FILES.FORM);
  const locale = useLocale();
  const router = useRouter();
  const [error, setError] = useState<string | undefined>('');
  const [isPending, setIsPending] = useState(false);
  const [isViewPassword, setIsViewPassword] = useState(false);

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      userName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (value: z.infer<typeof signupSchema>) => {
    setIsPending(true);
    setError('');

    try {
      const result = await signup(value, locale);
      router.replace(`${REDIRECT_PATHS.verifyEmail}/${result.email}`, { scroll: true });
      form.reset();
    } catch (error) {
      setIsPending(false);
      if (error instanceof Error) {
        setIsViewPassword(false);
        form.reset();
        setError(t(`${mapServerError(error.message)}`));
      } else {
        setError(t(`${mapServerError('')}`));
        setIsViewPassword(false);
        form.reset();
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="userName"
            render={({ field, fieldState }) => {
              return (
                <FormItem>
                  <FormLabel className="mb-2 text-sm font-normal tracking-normal leading-[21px] text-slate-700 dark:text-white">
                    {t('first_name')}
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type="text"
                        placeholder={t('first_name_placeholder')}
                        autoComplete="off"
                        aria-invalid={Boolean(fieldState?.invalid)}
                        disabled={isPending}
                      />
                      {Boolean(fieldState?.invalid) && (
                        <div className="absolute inset-y-0 flex items-center cursor-pointer pointer-events-none right-4">
                          <CircleAlert className="stroke-[#de2a1a]" />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  {Boolean(fieldState?.error) && (
                    <FormErrorMassege>{t(`${fieldState.error?.message}`)}</FormErrorMassege>
                  )}
                </FormItem>
              );
            }}
          />
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
                        field.onChange(e.target.value.trim());
                      }}
                      type="email"
                      placeholder={t('e_mail_placeholder')}
                      disabled={isPending}
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
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>{t('password_placeholder')}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={!isViewPassword ? 'password' : 'text'}
                      disabled={isPending}
                      placeholder="******"
                      aria-invalid={Boolean(fieldState?.invalid)}
                    />
                    <ViewPassword
                      disabled={isPending}
                      error={Boolean(fieldState?.error)}
                      isViewPassword={isViewPassword}
                      setIsViewPassword={() => setIsViewPassword((prev) => !prev)}
                    />
                  </div>
                </FormControl>
                {Boolean(fieldState?.error) && <FormErrorMassege>{t(`${fieldState.error?.message}`)}</FormErrorMassege>}
              </FormItem>
            )}
          />
        </div>

        {!!error && <div>{error}</div>}

        <Button type="submit" size={'primary'} disabled={!form.formState.isValid || isPending}>
          {isPending ? <LoaderCircle className="animate-spin" stroke="white" /> : t('signup_btn')}
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;
