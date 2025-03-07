'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from '@/i18n/routing';
import { FaqSearchShema } from '@/schemas/faq.search.shema';
import { IFaqSearchValue } from '@/types/faq.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export default function FaqSeach() {
  const router = useRouter();

  const form = useForm<IFaqSearchValue>({
    mode: 'onSubmit',
    resolver: zodResolver(FaqSearchShema),
    defaultValues: { qwery: '' },
  });

  const onSubmit = (data: IFaqSearchValue) => {
    router.push(`/faq/search?q=${data.qwery.trim()}`);
  };

  return (
    <section className="pt-4 pb-10" role="search">
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
                    placeholder="Пошук"
                    className="h-full p-4 rounded-tr-none rounded-br-none laptop:p-6"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant={'secondary'}
            className="p-4 rounded-tl-none rounded-bl-none laptop:p-6 laptop:large_button tablet:h5 tablet:min-h-[71px] tablet::min-w-[102px] laptop:min-w-[201px] laptop:min-h-[75px]"
          >
            Search
          </Button>
        </form>{' '}
      </Form>
    </section>
  );
}
