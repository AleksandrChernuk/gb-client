import { Container } from '@/shared/ui/Container';
import { getTranslations } from 'next-intl/server';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import CitySearch from '@/features/city-search/ui/CitySearch';

export async function CitySearchSection() {
  const t = await getTranslations(MESSAGE_FILES.ALL_COUNTRIES);

  return (
    <section className="pt-8 pb-4">
      <Container size="m">
        <h2 className="mb-1 text-lg font-bold tracking-normal leading-[28.8px] laptop:text-[28px] laptop:leading-[38.4px] text-slate-700 dark:text-slate-50">
          {t('select_departure_country')}
        </h2>

        <CitySearch />
      </Container>
    </section>
  );
}
