'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FormErrorMassege } from '@/components/ui/form-error';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { Button } from '@/components/ui/button';
import { useAllCountriesContext } from '../context';

export const citySearchSchema = z.object({
  duery: z.string().min(1, { message: 'required' }),
});

export default function CitySearch() {
  const t = useTranslations(MESSAGE_FILES.FORM);
  const { searchCities } = useAllCountriesContext();

  const form = useForm<z.infer<typeof citySearchSchema>>({
    resolver: zodResolver(citySearchSchema),
    defaultValues: {
      duery: '',
    },
  });

  const onSubmit = async (value: z.infer<typeof citySearchSchema>) => {
    searchCities(value.duery);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex ">
            <FormField
              control={form.control}
              name="duery"
              render={({ field, fieldState }) => (
                <FormItem className=" w-full ">
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      autoComplete="off"
                      aria-invalid={Boolean(fieldState?.invalid)}
                      className="h-full p-4 rounded-tl-2xl rounded-bl-2xl rounded-tr-none rounded-br-none laptop:p-6 bg-slate-50 dark:bg-slate-800"
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
              Пошук
            </Button>
          </div>
          {Boolean(form.getFieldState('duery').error) && (
            <FormErrorMassege>{t(`${form.getFieldState('duery')?.error?.message}`)}</FormErrorMassege>
          )}
        </form>
      </Form>
    </div>
  );
}
