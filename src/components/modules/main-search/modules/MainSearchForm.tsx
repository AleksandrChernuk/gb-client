'use client';

import { useTransition } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useSearchStore } from '@/store/useSearch';
import { useLocale, useTranslations } from 'next-intl';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import CitySearch from './CitySearch';
import DatePicker from './DatePicker';
import PassengersCount from './PassengersCount';
import { MainSearchShema } from '@/schemas/main.search.schema';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { useRouter } from 'next/navigation';

const MainSearchForm = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();

  const route = useRouter();
  const t = useTranslations(MESSAGE_FILES.COMMON);

  const handleSubmit = () => {
    const { to, from, date, adult, children, setErrors } = useSearchStore.getState();

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

    const query = new URLSearchParams();

    if (from?.id) query.set('from', String(from.id));
    if (to?.id) query.set('to', String(to.id));
    if (date) query.set('date', date);
    if (adult) query.set('adult', String(adult));
    if (children) query.set('children', String(children));
    const queryString = query.toString();

    startTransition(() => {
      route.push(`/${locale}/buses?${queryString}`, { scroll: true });
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
    <>
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
    </>
  );
};

export default MainSearchForm;
