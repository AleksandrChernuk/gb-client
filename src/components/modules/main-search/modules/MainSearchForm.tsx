'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useSearchStore } from '@/store/useSearch';
import { useTranslations } from 'next-intl';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import CitySearch from './CitySearch';
import DatePicker from './DatePicker';
import PassengersCount from './PassengersCount';
import { useRouter } from '@/i18n/routing';

export const formSchema = z.object({
  from: z.object({}, { message: 'required' }),
  to: z.object({}, { message: 'required' }),
});

const Search = () => {
  const matches = useMediaQuery('(max-width: 767px)');
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    route.push(`/buses?from=${from?.id}&to=${to?.id}&date=${date}&adult=${adult}&children=${children}`);
    setIsSubmitting(false);
  };

  return (
    <div className="relative bg-white shadow-xs rounded-2xl dark:bg-slate-800">
      <div className="flex flex-col h-full tablet:flex-row">
        <div className="items-center grid-cols-4 p-4 tablet:grid tablet:gap-4 laptop:gap-10">
          {matches ? (
            <>
              <CitySearch name={'from'} type="mobile" />
              <Separator className="h-[1px] bg-slate-200 dark:bg-slate-700 my-2" />
              <CitySearch name={'to'} type="mobile" />
              <Separator className="h-[1px] bg-slate-200 dark:bg-slate-700 my-2" />
              <DatePicker type="mobile" />
              <Separator className="h-[1px] bg-slate-200 dark:bg-slate-700 my-2" />
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
