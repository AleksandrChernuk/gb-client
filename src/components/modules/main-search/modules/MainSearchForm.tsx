'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useSearchStore } from '@/store/useSearch';
import { useLocale, useTranslations } from 'next-intl';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import CitySearch from './CitySearch';
import DatePicker from './DatePicker';
import PassengersCount from './PassengersCount';

export const formSchema = z.object({
  from: z.object({}, { message: 'required' }),
  to: z.object({}, { message: 'required' }),
});

const Search = () => {
  const matches = useMediaQuery('(max-width: 767px)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentLocale = useLocale();
  const route = useRouter();
  const t = useTranslations('common');

  const handleSubmit = () => {
    const { to, from, adult, children, date, setErrors } = useSearchStore.getState();

    setIsSubmitting(true);
    const validationResult = formSchema.safeParse({ from, to });

    if (!validationResult.success) {
      const formattedErrors = validationResult.error.format();

      setErrors('from', formattedErrors.from?._errors[0] || null);
      setErrors('to', formattedErrors.to?._errors[0] || null);
      setIsSubmitting(false);

      return;
    }
    route.push(
      `/${currentLocale}/buses?from=${from?.id}&to=${to?.id}&date=${date}&adult=${adult}&children=${children}`,
    );
    setIsSubmitting(false);
  };

  return (
    <div className="relative rounded-2xl bg-white dark:bg-dark_main shadow">
      <div className="flex flex-col h-full tablet:flex-row">
        <div className="items-center grid-cols-4 p-4 tablet:grid tablet:gap-4 laptop:gap-10">
          {matches ? (
            <>
              <CitySearch name={'from'} type="mobile" />
              <Separator className="h-[1px] bg-gray_1 dark:bg-black_2_for_text my-2" />
              <CitySearch name={'to'} type="mobile" />
              <Separator className="h-[1px] bg-gray_1 dark:bg-black_2_for_text my-2" />
              <DatePicker type="mobile" />
              <Separator className="h-[1px] bg-gray_1 dark:bg-black_2_for_text my-2" />
              <PassengersCount type="mobile" />
            </>
          ) : (
            <>
              <CitySearch name={'from'} type="desktop" />
              <CitySearch name={'to'} type="desktop" />
              <DatePicker type="desktop" />
              <PassengersCount type="desktop" />
            </>
          )}
        </div>

        <Button variant={'main'} size={'mainSearch'} disabled={isSubmitting} onClick={handleSubmit}>
          {isSubmitting ? <LoaderCircle className="animate-spin" /> : t('searchBtn')}
        </Button>
      </div>
    </div>
  );
};

export default Search;
