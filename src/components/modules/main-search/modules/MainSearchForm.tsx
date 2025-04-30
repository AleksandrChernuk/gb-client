'use client';

import { useTransition } from 'react';
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
import { MainSearchShema } from '@/schemas/main.search.schema';

const MainSearchForm = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [isPending, startTransition] = useTransition();

  const route = useRouter();
  const t = useTranslations('common');

  const handleSubmit = () => {
    const { to, from, adult, children, date, setErrors } = useSearchStore.getState();

    const validate = () => {
      const result = MainSearchShema.safeParse({ from, to });
      if (!result.success) {
        const errors = result.error.format();
        setErrors('from', errors.from?._errors[0] || null);
        setErrors('to', errors.to?._errors[0] || null);
        return false;
      }
      return true;
    };

    if (!validate()) return;

    startTransition(() => {
      route.push(`/buses?from=${from?.id}&to=${to?.id}&date=${date}&adult=${adult}&children=${children}`);
    });
  };

  const renderFields = (variant: 'mobile' | 'desktop') => (
    <>
      <CitySearch name="from" variant={variant} />
      {variant === 'mobile' && <Separator className="h-[1px] bg-slate-200 dark:bg-slate-700 my-2" />}
      <CitySearch name="to" variant={variant} />
      {variant === 'mobile' && <Separator className="h-[1px] bg-slate-200 dark:bg-slate-700 my-2" />}
      <DatePicker variant={variant} />
      {variant === 'mobile' && <Separator className="h-[1px] bg-slate-200 dark:bg-slate-700 my-2" />}
      <PassengersCount variant={variant} />
    </>
  );

  return (
    <div className="relative bg-white shadow-xs rounded-2xl dark:bg-slate-800">
      <div className="flex flex-col h-full tablet:flex-row">
        <div className="items-center grid-cols-4 p-4 tablet:grid tablet:gap-4 laptop:gap-10">
          {renderFields(isMobile ? 'mobile' : 'desktop')}
        </div>
        <Button variant={'main'} size={'mainSearch'} disabled={isPending} onClick={handleSubmit}>
          {isPending ? <LoaderCircle className="animate-spin" stroke="white" /> : t('searchBtn')}
        </Button>
      </div>
    </div>
  );
};

export default MainSearchForm;
