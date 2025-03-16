'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import { useRequestPartnershipSchema } from '@/schemas/request.partnership.shema';
import { IRequestPartnershipForm } from '@/types/request.partnership';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

export default function RequestPartnershipForm() {
  const t = useTranslations('forms');
  const partnershipSchem = useRequestPartnershipSchema(t);

  const form = useForm<IRequestPartnershipForm>({
    mode: 'onSubmit',
    resolver: zodResolver(partnershipSchem),
    defaultValues: { name: '', company: '', type: '', email: '', phone: '' },
  });

  const onSubmit = (data: IRequestPartnershipForm) => {
    console.log(data);
    form.reset({ name: '', company: '', type: '', email: '', phone: '' });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{t('contact_person')}</FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder={t('name_placeholder')} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{t('name_of_the_company')}</FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder={t('name_placeholder')} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{t('type_of_business')}</FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder={t('type_placeholder')} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{t('e_mail')}</FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder={t('e_mail_placeholder')} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
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
              </FormItem>
            )}
          />
          <Button type="submit" variant={'default'} className="h5 px-4 py-4 w-full rounded-full mt-6">
            {t('request_btn')}
          </Button>
        </form>
      </Form>
    </div>
  );
}
