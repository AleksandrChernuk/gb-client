'use client';

import { Button } from '@/shared/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { useRouter } from '@/shared/i18n/routing';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { FaqSearchSchema, type FaqSearchValues } from '../model/faq-search.schema';

export default function FaqSearch() {
  const router = useRouter();
  const t = useTranslations(MESSAGE_FILES.QUESTIONS_PAGE);

  const form = useForm<FaqSearchValues>({
    mode: 'onSubmit',
    resolver: zodResolver(FaqSearchSchema),
    defaultValues: { query: '' },
  });

  const onSubmit = ({ query }: FaqSearchValues) => {
    router.push(`/faq/search?q=${query.trim()}`);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full">
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  autoComplete="off"
                  placeholder={t('search_for_topic_or_question')}
                  className="h-full p-4 rounded-l-2xl rounded-r-none laptop:p-6"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="secondary"
          className="h-full p-4 rounded-l-none rounded-r-2xl laptop:p-6 laptop:text-lg font-bold"
        >
          {t('search')}
        </Button>
      </form>
    </Form>
  );
}
