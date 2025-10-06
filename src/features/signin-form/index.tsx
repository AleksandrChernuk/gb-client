'use client';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { CircleAlert, LoaderCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FormErrorMassege } from '@/shared/ui/form-error';

import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';

import ViewPassword from '@/shared/ui/ViewPassword';
import { useSignin } from '@/features/signin-form/useSignin';

const SigninForm = () => {
  const t = useTranslations(MESSAGE_FILES.FORM);

  const { isLoading, isViewPassword, setIsViewPassword, form, onSubmit, errorSignin } = useSignin();

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

        <Button type="submit" size={'primary'} disabled={isLoading}>
          {form.formState.isSubmitting ? <LoaderCircle className="animate-spin" stroke="white" /> : t('login_btn')}
        </Button>
      </form>
    </Form>
  );
};

export default SigninForm;
