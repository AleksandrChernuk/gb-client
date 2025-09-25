'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { useLocale, useTranslations } from 'next-intl';

import { toast } from 'sonner';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { profileNameSchema } from '@/shared/validation/profile.schemas';
import { useUserStore } from '@/shared/store/useUser';
import { updateUser } from '@/shared/api/auth.service';
import { mapServerError } from '@/shared/errors/mapServerError';
import ProfileFormActions from '@/entities/profile/ProfileFormActions';
import { FormErrorMassege } from '@/shared/ui/form-error';

const UpdateProfileNameForm = () => {
  const locale = useLocale();
  const t = useTranslations(MESSAGE_FILES.FORM);
  const [isInputEnabled, setIsInputEnabled] = useState(false);
  const [isLoadingUpdateName, setIsLoadingUpdateName] = useState(false);
  const { currentUser, setUserStore } = useUserStore();

  const form = useForm<z.infer<typeof profileNameSchema>>({
    resolver: zodResolver(profileNameSchema),
    defaultValues: {
      name: currentUser?.userName || '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (rowData: z.infer<typeof profileNameSchema>) => {
    if (rowData.name.trim() === currentUser?.userName) {
      toast.error('Введите новое имя');

      return;
    }

    setIsLoadingUpdateName(true);

    try {
      const result = await updateUser({ userName: rowData.name.trim() }, locale);

      if (result.user) {
        setUserStore({ ...currentUser!, userName: result.user.userName });
      }
      setIsInputEnabled(false);
      toast.success(t('name_changed_success'));
    } catch (error) {
      if (error instanceof Error) {
        toast.error(t(mapServerError(error.message)));
      } else {
        toast.error(t(mapServerError('')));
      }
    } finally {
      setIsLoadingUpdateName(false);
    }
  };

  const handleSetEnabled = (v: boolean) => {
    if (v) {
      setIsInputEnabled(true);
    } else {
      setIsInputEnabled(false);
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="sr-only">{t('first_name')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder={t('first_name_placeholder')}
                    disabled={isLoadingUpdateName || !isInputEnabled}
                    autoComplete="off"
                    aria-invalid={Boolean(fieldState?.invalid)}
                  />
                </FormControl>
                {Boolean(fieldState?.error) && <FormErrorMassege>{t(`${fieldState.error?.message}`)}</FormErrorMassege>}
              </FormItem>
            )}
          />
        </div>
        <ProfileFormActions
          isInputEnabled={isInputEnabled}
          setIsInputEnabled={handleSetEnabled}
          isSubmitting={isLoadingUpdateName}
          disabledSubmit={!form.formState.isValid}
        />
      </form>
    </Form>
  );
};

export default UpdateProfileNameForm;
