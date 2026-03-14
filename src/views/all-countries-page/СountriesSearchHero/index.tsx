import { Container } from '@/shared/ui/Container';
import { BreadcrumbSimple } from '@/shared/ui/BreadcrumbSimple';
import MainSearch from '@/features/route-search-form';
import { getLocale, getTranslations } from 'next-intl/server';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Locale } from 'next-intl';

export async function СountriesSearchHero() {
  const t = await getTranslations(MESSAGE_FILES.ALL_COUNTRIES);
  const lng = (await getLocale()) as Locale;

  return (
    <section className="bg-green-500 dark:bg-slate-900">
      <Container size="l" className="py-5">
        <div className="mb-4">
          <BreadcrumbSimple
            locale={lng}
            items={[
              { label: t('breadcrumbs_home'), href: `/` },
              { label: t('buses_breadcrumb'), href: `/all-countries/` },
            ]}
          />
        </div>
        <MainSearch />
      </Container>
    </section>
  );
}
