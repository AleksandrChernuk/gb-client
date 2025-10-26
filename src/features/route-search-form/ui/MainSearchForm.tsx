'use client';

import { useState, useTransition } from 'react';
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
import { useRouterSearch } from '@/shared/hooks/useRouterSearch';
import { validateField } from '@/features/route-search-form/helpers/validateField';

const MainSearchForm = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<{ from?: string | null; to?: string | null }>({
    from: null,
    to: null,
  });

  const route = useRouter();
  const t = useTranslations(MESSAGE_FILES.COMMON);

  const [params] = useRouterSearch();

  const handleSubmit = () => {
    const { from, to, date, voyagers } = params;

    const result = MainSearchShema.safeParse({ from, to });

    if (!result.success) {
      validateField('from', from, t, setErrors);
      validateField('to', to, t, setErrors);
      return;
    }

    setErrors({ from: null, to: null });

    const searchParams = new URLSearchParams();

    if (from) searchParams.set('from', from);
    if (to) searchParams.set('to', to);
    if (date) searchParams.set('date', date);

    if (voyagers !== 1) searchParams.set('voyagers', String(voyagers));

    startTransition(() => {
      route.push(`/buses?${searchParams.toString()}`, { scroll: true });
    });
  };

  const renderFields = (variant: 'mobile' | 'desktop') => (
    <>
      <CitySearch
        name="from"
        variant={variant}
        error={errors.from}
        resetError={() => setErrors((prev) => ({ ...prev, from: null }))}
        setErrorsRaw={setErrors}
      />
      {variant === 'mobile' && <Separator className="h-[1px] my-2  bg-slate-300 dark:bg-slate-700" />}
      <CitySearch
        name="to"
        variant={variant}
        error={errors.to}
        resetError={() => setErrors((prev) => ({ ...prev, to: null }))}
        setErrorsRaw={setErrors}
      />
      {variant === 'mobile' && <Separator className="h-[1px] my-2  bg-slate-300 dark:bg-slate-700" />}
      <DatePicker variant={variant} />
      {variant === 'mobile' && <Separator className="h-[1px] my-2 bg-slate-300 dark:bg-slate-700" />}
      <PassengersCount variant={variant} />
    </>
  );

  return (
    <div className="relative bg-white shadow-xs rounded-2xl dark:bg-slate-800">
      <div className="flex flex-col h-full tablet:flex-row">
        <div className="items-center grid-cols-4 p-4 tablet:grid tablet:gap-4 laptop:gap-10">
          {renderFields(isMobile ? 'mobile' : 'desktop')}
        </div>
        <Button
          variant="main"
          size="mainSearch"
          disabled={isPending}
          onClick={handleSubmit}
          className="disabled:opacity-100"
        >
          {isPending ? <LoaderCircle className="animate-spin" stroke="white" /> : t('searchBtn')}
        </Button>
      </div>
    </div>
  );
};

export default MainSearchForm;
