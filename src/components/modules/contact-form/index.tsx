'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { FormErrorMassege } from '@/components/ui/form-error';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { contactSchema } from '@/schemas/contact.form.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export default function ContactForm() {
  const t = useTranslations(MESSAGE_FILES.FORM);

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    mode: 'onSubmit',
    defaultValues: { firstName: '', text: '', email: '' },
  });

  const onSubmit = (data: z.infer<typeof contactSchema>) => {
    toast.info(`${JSON.stringify(data)}`);
    form.reset({ firstName: '', text: '', email: '' });
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
            size={'primery'}
            className="w-full px-4 py-4 mt-6 text-base font-bold leading-6 tracking-normal rounded-full"
          >
            {t('request_btn')}
          </Button>
        </form>
      </Form>
    </div>
  );
}
