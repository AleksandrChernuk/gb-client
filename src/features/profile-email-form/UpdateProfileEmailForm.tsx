/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/shared/ui/form';
import { useLocale, useTranslations } from 'next-intl';
import { useUserStore } from '@/shared/store/useUser';
import { toast } from 'sonner';
import { logout, updateUser } from '@/shared/api/auth.service';
import { useRouter } from '@/shared/i18n/routing';
import { profileEmailSchema } from '@/shared/validation/profile.schemas';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { REDIRECT_PATHS } from '@/shared/configs/redirectPaths';
import { mapServerError } from '@/shared/errors/mapServerError';
import { Input } from '@/shared/ui/input';
import { CircleAlert } from 'lucide-react';
import { FormErrorMassege } from '@/shared/ui/form-error';
import ViewPassword from '@/shared/ui/ViewPassword';
import ProfileFormActions from '@/entities/profile/ProfileFormActions';

const UpdateProfileEmailForm = () => {
  const locale = useLocale();
  const t = useTranslations(MESSAGE_FILES.FORM);
  const router = useRouter();
  const [isInputEnabled, setIsInputEnabled] = useState(false);
  const [isViewPassword, setIsViewPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, clearUserStore } = useUserStore();

  const form = useForm<z.infer<typeof profileEmailSchema>>({
    resolver: zodResolver(profileEmailSchema),
    defaultValues: {
      email: currentUser?.email || '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (rowData: z.infer<typeof profileEmailSchema>) => {
    setIsLoading(true);

    try {
      const updateData: any = { newEmail: rowData.email.trim() };

      if (currentUser?.method === 'CREDENTIALS') {
        updateData.currentPassword = rowData.password;
      }

      await updateUser(updateData, locale);
      clearUserStore();
      logout();

      router.push(`/${REDIRECT_PATHS.verifyEmail}/${encodeURIComponent(rowData.email.trim())}`);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(t(mapServerError(error.message)));
      } else {
        toast.error(t(mapServerError('')));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetEnabled = (v: boolean) => {
    if (v) {
      setIsInputEnabled(true);
      setIsViewPassword(false);
    } else {
      setIsInputEnabled(false);
      setIsViewPassword(false);
      form.reset({
        email: currentUser?.email || '',
        password: '',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>{t('new_email')}</FormLabel>
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
                      disabled={form.formState.isSubmitting || !isInputEnabled}
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
                      disabled={form.formState.isSubmitting || !isInputEnabled}
                      type={!isViewPassword ? 'password' : 'text'}
                      placeholder="******"
                      aria-invalid={Boolean(fieldState?.invalid)}
                      autoComplete="off"
                    />
                    <ViewPassword
                      error={Boolean(fieldState?.error)}
                      isViewPassword={isViewPassword}
                      setIsViewPassword={() => {
                        if (form.formState.isSubmitting || !isInputEnabled) return;
                        setIsViewPassword((prev) => !prev);
                      }}
                      disabled={form.formState.isSubmitting || !isInputEnabled}
                    />
                  </div>
                </FormControl>
                {Boolean(fieldState?.error) && <FormErrorMassege>{t(`${fieldState.error?.message}`)}</FormErrorMassege>}
              </FormItem>
            )}
          />
        </div>
        <ProfileFormActions
          disabled={currentUser?.method !== 'CREDENTIALS'}
          isInputEnabled={isInputEnabled}
          setIsInputEnabled={handleSetEnabled}
          isSubmitting={isLoading}
          disabledSubmit={!form.formState.isValid}
        />
      </form>
    </Form>
  );
};

export default UpdateProfileEmailForm;
