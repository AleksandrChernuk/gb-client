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
// import FormError from '@/components/shared/FormError';
import { signinSchema } from '@/schemas/auth.schema';
import { FormErrorMassege } from '@/components/ui/form-error';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { signin } from '@/actions/auth.service';
import { REDIRECT_PATHS } from '@/config/redirectPaths';
import { useUserStore } from '@/store/useUser';
import FormError from '@/components/shared/FormError';
import { useRouter } from '@/i18n/routing';

const SigninForm = () => {
  const t = useTranslations(MESSAGE_FILES.FORM);
  const locale = useLocale();
  const router = useRouter();
  const [errorSignin, setErrorSignin] = useState<string | null>(null);
  const [isViewPassword, setIsViewPassword] = useState(false);

  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: z.infer<typeof signinSchema>) => {
    console.log('values', data);
    try {
      const result = await signin({ email: data.email, password: data.password }, locale);

      const { message, currentUser, error } = result;

      if (!!error) {
        setErrorSignin(error);
        form.reset();
      }

      if (message === '2FA code sent') {
        router.push(`${REDIRECT_PATHS.verify2FA}/${result.email}`);
        form.reset();
      }

      if (message === 'Verification code sent') {
        router.push(`${REDIRECT_PATHS.verifyEmail}/${result.email}`);
        form.reset();
      }

      if (message === 'Successfully signin') {
        useUserStore.getState().setUserStore(currentUser);

        router.push(REDIRECT_PATHS.profile);
        form.reset();
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Signin failed:', JSON.stringify(error.message));
      } else {
        console.error('Signin failed:', JSON.stringify(error));
      }
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
                <FormLabel>{t('authEmail')}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      disabled={form.formState.isSubmitting}
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
                <FormLabel>{t('authPassword')}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      disabled={form.formState.isSubmitting}
                      type={!isViewPassword ? 'password' : 'text'}
                      placeholder="******"
                      aria-invalid={Boolean(fieldState?.invalid)}
                      autoComplete="off"
                    />
                    <ViewPassword
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

        {errorSignin && <FormError message={errorSignin} />}

        <Button
          type="submit"
          size={'primary'}
          className="w-full py-[14px] px-6  tablet:py-4 text-white rounded-full text-base font-bold leading-6 tracking-normal max-h-[48px] tablet:max-h-[52px] "
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? <LoaderCircle className="animate-spin" stroke="white" /> : t('signinTitle')}
        </Button>
      </form>
    </Form>
  );
};

export default SigninForm;
