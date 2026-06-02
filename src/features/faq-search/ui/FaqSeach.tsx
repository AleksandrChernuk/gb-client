'use client';

import { Button } from '@/shared/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from '@/shared/i18n/routing';
import { useSearchParams } from 'next/navigation';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { FaqSearchSchema, type FaqSearchValues } from '../model/faq-search.schema';

export default function FaqSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations(MESSAGE_FILES.QUESTIONS_PAGE);

  const form = useForm<FaqSearchValues>({
    mode: 'onSubmit',
    resolver: zodResolver(FaqSearchSchema),
    defaultValues: { query: searchParams.get('q') ?? '' },
  });

  const skipSyncRef = useRef(false);

  useEffect(() => {
    if (skipSyncRef.current) {
      skipSyncRef.current = false;
      return;
    }
    form.setValue('query', searchParams.get('q') ?? '');
  }, [searchParams]);

  const onSubmit = ({ query }: FaqSearchValues) => {
    router.push(`/faq/search?q=${query.trim()}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, fieldOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void) => {
    fieldOnChange(e);
    if (!e.target.value) {
      skipSyncRef.current = true;
      router.push('/faq/search');
    }
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
                <div className="relative w-full">
                  <Input
                    {...field}
                    onChange={(e) => handleChange(e, field.onChange)}
                    type="text"
                    autoComplete="off"
                    placeholder={t('search_for_topic_or_question')}
                    className="h-full p-4 pr-10 rounded-l-2xl rounded-r-none laptop:p-6 laptop:pr-12"
                  />
                  {field.value && (
                    <button
                      type="button"
                      onClick={() => {
                        form.setValue('query', '');
                        router.push('/faq/search');
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      <X className="size-4" />
                    </button>
                  )}
                </div>
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
