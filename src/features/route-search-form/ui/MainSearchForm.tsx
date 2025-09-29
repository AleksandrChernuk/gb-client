'use client';

import { useEffect, useRef, useTransition } from 'react';
import { useSearchStore } from '@/shared/store/useSearch';
import { useTranslations } from 'next-intl';
import { LoaderCircle } from 'lucide-react';
import CitySearch from './CitySearch';
import DatePicker from './DatePicker';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import { useRouter } from '@/shared/i18n/routing';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { MainSearchShema } from '@/shared/validation/main.search.schema';
import PassengersCount from '@/features/route-search-form/ui/PassengersCount';
import { Separator } from '@/shared/ui/separator';
import { Button } from '@/shared/ui/button';
import { useSearchParams } from 'next/navigation';
import { isBefore, isValid, format } from 'date-fns';

const MainSearchForm = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const isInitialized = useRef(false);

  const route = useRouter();
  const t = useTranslations(MESSAGE_FILES.COMMON);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    const store = useSearchStore.getState();

    if (!store.from) {
      const fromId = searchParams.get('from');
      if (fromId && !isNaN(parseInt(fromId))) {
        store.setCityId('from', parseInt(fromId));
      }
    }

    if (!store.to) {
      const toId = searchParams.get('to');
      if (toId && !isNaN(parseInt(toId))) {
        store.setCityId('to', parseInt(toId));
      }
    }

    if (!store.date) {
      const dateParam = searchParams.get('date');
      if (dateParam) {
        const date = new Date(dateParam);
        if (isValid(date) && !isBefore(date, new Date())) {
          store.setDate(dateParam);
        } else {
          store.setDate(format(new Date(), 'yyyy-MM-dd'));
        }
      }
    }

    if (store.adult <= 1) {
      const adultParam = searchParams.get('adult');
      if (adultParam) {
        const adults = parseInt(adultParam);
        if (adults >= 1 && adults <= 10) {
          store.setPassenger('adult', adults);
        }
      }
    }

    if (store.children <= 0) {
      const childrenParam = searchParams.get('children');
      if (childrenParam) {
        const children = parseInt(childrenParam);
        if (children >= 0 && children <= 10) {
          store.setPassenger('children', children);
        }
      }
    }
  }, [searchParams]);

  const handleSubmit = () => {
    const { from, to, date, adult, children, setErrors } = useSearchStore.getState();
    setErrors('from', null);
    setErrors('to', null);

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

    if (from) query.set('from', String(from));
    if (to) query.set('to', String(to));
    if (date) query.set('date', date);
    if (adult) query.set('adult', String(adult));
    if (children && children !== 0) query.set('children', String(children));

    startTransition(() => {
      route.push(`/buses?${query.toString()}`, { scroll: true });
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
