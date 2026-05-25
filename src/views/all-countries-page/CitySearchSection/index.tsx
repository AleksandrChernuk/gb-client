import { Container } from '@/shared/ui/Container';
import { getTranslations } from 'next-intl/server';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import CitySearch from '@/features/city-search/ui/CitySearch';
import { Suspense } from 'react';
import { Skeleton } from '@/shared/ui/skeleton';

export async function CitySearchSection({ isCountry = true }: { isCountry?: boolean }) {
  const t = await getTranslations(MESSAGE_FILES.ALL_COUNTRIES);

  return (
    <section className="pt-8 pb-4">
      <Container size="m">
        <h2 className="mb-4 text-lg font-bold tracking-normal leading-[28.8px] laptop:text-[28px] laptop:leading-[38.4px] text-slate-700 dark:text-slate-50">
          {isCountry ? t('select_departure_country') : t('find_your_city')}
        </h2>

        <Suspense fallback={<Skeleton className="h-[56px] laptop:h-[72px] w-full rounded-2xl" />}>
          <CitySearch placeholder={isCountry ? t('select_departure_country') : t('find_your_city')} />
        </Suspense>
      </Container>
    </section>
  );
}
