'use client';

import { sendFeedback } from '@/actions/mail.actions';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { FormErrorMassege } from '@/components/ui/form-error';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MAX_USER_FEEDBACK_LEN } from '@/config/limitsChar';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { contactSchema } from '@/schemas/contact.form.schema';
import { sanitizePlainText } from '@/utils/sanitize';
import { sanitizeEmail } from '@/utils/sanitizeEmail';
import { sanitizeUsername } from '@/utils/sanitizeUsername';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export default function ContactForm() {
  const t = useTranslations(MESSAGE_FILES.FORM);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    mode: 'onSubmit',
    defaultValues: { firstName: '', text: '', email: '' },
  });

  const onSubmit = async (data: z.infer<typeof contactSchema>) => {
    startTransition(async () => {
      try {
        await sendFeedback({
          firstName: sanitizeUsername(data.firstName),
          email: sanitizeEmail(data.email),
          text: sanitizePlainText(data.text, MAX_USER_FEEDBACK_LEN, true),
        });
        toast.success(t('toast.success'));
        form.reset();
      } catch (err) {
        toast.error(typeof err === 'string' ? err : t('toast.error'));
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
            name="text"
            render={({ field, fieldState }) => (
              <FormItem className="w-full">
                <FormLabel>{t('message_text')}</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder={t('message_text_placeholder')}
                    rows={6}
                    className="resize-none"
                    {...field}
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
