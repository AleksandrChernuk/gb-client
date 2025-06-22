'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { useRouter } from '@/i18n/routing';
import { FaqSearchShema } from '@/schemas/faq.search.schema';
import { IFaqSearchValue } from '@/types/faq.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

export default function FaqSeach() {
  const router = useRouter();
  const t = useTranslations(MESSAGE_FILES.QUESTIONS_PAGE);

  const form = useForm<IFaqSearchValue>({
    mode: 'onSubmit',
    resolver: zodResolver(FaqSearchShema),
    defaultValues: { qwery: '' },
  });

  const onSubmit = (data: IFaqSearchValue) => {
    router.push(`/faq/search?q=${data.qwery.trim()}`);
    form.reset({ qwery: '' });
  };

  return (
    <section className="my-6 tablet:my-8 laptop:my-12" role="search">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full">
          <FormField
            control={form.control}
            name="qwery"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder={t('search_for_topic_or_question')}
                    className="h-full p-4 rounded-tl-2xl rounded-bl-2xl  rounded-tr-none rounded-br-none laptop:p-6"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant={'secondary'}
            className="p-4 rounded-tl-none rounded-bl-none laptop:p-6 laptop:text-lg font-bold tracking-normal laptop:leading-[21.6px] tablet:text-base tablet:leading-6 tablet:min-h-[71px] tablet::min-w-[102px] laptop:min-w-[201px] laptop:min-h-[75px]"
          >
            {t('search')}
          </Button>
        </form>
      </Form>
    </section>
  );
}
