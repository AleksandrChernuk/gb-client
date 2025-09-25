'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { CircleAlert, LoaderCircle } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { FormErrorMassege } from '@/shared/ui/form-error';
import { signin } from '@/shared/api/auth.service';
import { useUserStore } from '@/shared/store/useUser';
import { useRouter } from '@/shared/i18n/routing';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { signinSchema } from '@/shared/validation/auth.schema';
import { REDIRECT_PATHS } from '@/shared/configs/redirectPaths';
import { mapServerError } from '@/shared/errors/mapServerError';
import ViewPassword from '@/shared/ui/ViewPassword';

const SigninForm = () => {
  const t = useTranslations(MESSAGE_FILES.FORM);
  const locale = useLocale();
  const router = useRouter();
  const [errorSignin, setErrorSignin] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setUserStore } = useUserStore();

  const [isViewPassword, setIsViewPassword] = useState(false);

  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: z.infer<typeof signinSchema>) => {
    setIsLoading(true);
    setErrorSignin(null);
    try {
      const result = await signin({ email: data.email, password: data.password }, locale);

      const { message, currentUser, error } = result;

      if (!!error) {
        setErrorSignin(t(`${mapServerError(error.message)}`));
        setIsViewPassword(false);
        setIsLoading(false);
        form.reset();
        return;
      }

      if (message === '2FA code sent') {
        router.push(`/${REDIRECT_PATHS.verify2FA}/${result.email}`, { scroll: true });
        setIsViewPassword(false);
        setIsLoading(false);
        form.reset();
        return;
      }

      if (message === 'Verification code sent') {
        router.push(`/${REDIRECT_PATHS.verifyEmail}/${result.email}`, { scroll: true });
        setIsViewPassword(false);
        setIsLoading(false);
        form.reset();
        return;
      }

      if (message === 'Successfully signin') {
        setUserStore(currentUser);
        router.replace(`/${REDIRECT_PATHS.profile}`);
        return;
      }

      setErrorSignin(t('error_occurred'));
    } catch (e) {
      const msg = e instanceof Error ? e.message : '';
      setErrorSignin(t(mapServerError(msg)));
    } finally {
      setIsViewPassword(false);
      setIsLoading(false);
      form.reset({ email: data.email, password: '' });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>{t('e_mail_placeholder')}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      disabled={form.formState.isSubmitting || isLoading}
                      type="email"
                      placeholder="user@example.com"
                      aria-invalid={Boolean(fieldState?.invalid)}
                      autoComplete="off"
                    />
                    {Boolean(fieldState?.invalid) && (
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
                      disabled={form.formState.isSubmitting || isLoading}
                      type={!isViewPassword ? 'password' : 'text'}
                      placeholder="******"
                      aria-invalid={Boolean(fieldState?.invalid)}
                      autoComplete="off"
                    />
                    <ViewPassword
                      disabled={form.formState.isSubmitting || isLoading}
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

        {errorSignin && <div>{errorSignin}</div>}

        <Button type="submit" size={'primary'} disabled={!form.formState.isValid || isLoading}>
          {form.formState.isSubmitting ? <LoaderCircle className="animate-spin" stroke="white" /> : t('login_btn')}
        </Button>
      </form>
    </Form>
  );
};

export default SigninForm;
