'use client';

import { useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { LoaderCircle } from 'lucide-react';
import { useRouter } from '@/shared/i18n/routing';
import { useRouterSearch } from '@/shared/hooks/useRouterSearch';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import { MainSearchShema } from '@/shared/validation/main.search.schema';
import { validateField } from '@/features/route-search-form/helpers/validateField';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Button } from '@/shared/ui/button';
import { Separator } from '@/shared/ui/separator';
import { ILocation } from '@/shared/types/location.types';
import { TripCityInput } from './TripCityInput';
import { TripDatePicker } from './TripDatePicker';
import { TripPassengers } from './TripPassengers';
import { useTripCities } from '../hooks/useTripCities';

type Props = {
  initialFavorites: ILocation[];
};

export function TripSearchForm({ initialFavorites }: Props) {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<{ from?: string | null; to?: string | null }>({
    from: null,
    to: null,
  });

  const router = useRouter();
  const t = useTranslations(MESSAGE_FILES.COMMON);
  const [params] = useRouterSearch();

  // один раз здесь — не дублируется в каждом TripCityInput
  const { fromCity, toCity } = useTripCities();

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
      router.push(`/buses?${searchParams.toString()}`, { scroll: true });
    });
  };

  const variant = isMobile ? 'mobile' : 'desktop';

  return (
    <div className="relative bg-white dark:bg-slate-800 shadow-xs rounded-2xl">
      <div className="flex flex-col h-full tablet:flex-row">
        <div className="items-center p-4 tablet:grid tablet:grid-cols-4 tablet:gap-4 laptop:gap-10">
          <TripCityInput
            name="from"
            variant={variant}
            initialFavorites={initialFavorites}
            city={fromCity ?? null}
            error={errors.from}
            resetError={() => setErrors((p) => ({ ...p, from: null }))}
          />
          {isMobile && <Separator className="my-2 bg-slate-300 dark:bg-slate-700" />}
          <TripCityInput
            name="to"
            variant={variant}
            initialFavorites={initialFavorites}
            city={toCity ?? null}
            error={errors.to}
            resetError={() => setErrors((p) => ({ ...p, to: null }))}
          />
          {isMobile && <Separator className="my-2 bg-slate-300 dark:bg-slate-700" />}
          <TripDatePicker variant={variant} />
          {isMobile && <Separator className="my-2 bg-slate-300 dark:bg-slate-700" />}
          <TripPassengers variant={variant} />
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
}
