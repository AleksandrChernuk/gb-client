'use client';

import { sendProposal } from '@/shared/api/mail.actions';
import { MAX_USER_FEEDBACK_LEN } from '@/shared/configs/limitsChar';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Button } from '@/shared/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/shared/ui/form';
import { FormErrorMassege } from '@/shared/ui/form-error';
import { Input } from '@/shared/ui/input';
import { PhoneInput } from '@/shared/ui/phone-input';
import { sanitizePlainText } from '@/shared/utils/sanitize';
import { sanitizeEmail } from '@/shared/utils/sanitizeEmail';
import { sanitizeUsername } from '@/shared/utils/sanitizeUsername';
import { cooperationSchema } from '@/shared/validation/cooperation.schema';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export default function CooperationForm() {
  const t = useTranslations(MESSAGE_FILES.FORM);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof cooperationSchema>>({
    resolver: zodResolver(cooperationSchema),
    mode: 'onSubmit',
    defaultValues: { firstName: '', company: '', type: '', email: '', phone: '' },
  });

  const onSubmit = async (data: z.infer<typeof cooperationSchema>) => {
    startTransition(async () => {
      try {
        await sendProposal({
          firstName: sanitizeUsername(data.firstName),
          company: sanitizePlainText(data.company, MAX_USER_FEEDBACK_LEN, false),
          type: sanitizePlainText(data.type, MAX_USER_FEEDBACK_LEN, false),
          email: sanitizeEmail(data.email),
          phone: data.phone,
        });
        toast.success('toast.success');
        form.reset();
      } catch (err) {
        toast.error(typeof err === 'string' ? err : 'toast.error');
      }
    });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field, fieldState }) => (
              <FormItem className="w-full">
                <FormLabel>{t('contact_person')}</FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder={t('first_name_placeholder')} />
                </FormControl>
                {!!fieldState.error && <FormErrorMassege>{t(`${fieldState.error.message}`)}</FormErrorMassege>}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field, fieldState }) => (
              <FormItem className="w-full">
                <FormLabel>{t('name_of_the_company')}</FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder={t('last_name_placeholder')} />
                </FormControl>
                {!!fieldState.error && <FormErrorMassege>{t(`${fieldState.error.message}`)}</FormErrorMassege>}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field, fieldState }) => (
              <FormItem className="w-full">
                <FormLabel>{t('type_of_business')}</FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder={t('type_placeholder')} />
                </FormControl>
                {!!fieldState.error && <FormErrorMassege>{t(`${fieldState.error.message}`)}</FormErrorMassege>}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem className="w-full">
                <FormLabel>{t('e_mail')}</FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder={t('e_mail_placeholder')} />
                </FormControl>
                {!!fieldState.error && <FormErrorMassege>{t(`${fieldState.error.message}`)}</FormErrorMassege>}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>{t('phone')}</FormLabel>
                <FormControl>
                  <PhoneInput
                    {...field}
                    defaultCountry="UA"
                    international
                    limitMaxLength
                    placeholder={t('phone_placeholder')}
                  />
                </FormControl>
                {!!fieldState.error && <FormErrorMassege>{t(`${fieldState.error.message}`)}</FormErrorMassege>}
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant={'default'}
            size={'primary'}
            className="w-full px-4 py-4 mt-6 text-base font-bold leading-6 tracking-normal rounded-full"
          >
            {isPending ? 'Loading...' : t('request_btn')}
          </Button>
        </form>
      </Form>
    </div>
  );
}
