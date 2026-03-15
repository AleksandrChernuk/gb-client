import { Container } from '@/shared/ui/Container';
import { BreadcrumbSimple } from '@/shared/ui/BreadcrumbSimple';
import MainSearch from '@/features/route-search-form';
import { getLocale, getTranslations } from 'next-intl/server';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';

export async function BusesSearchHero() {
  const t = await getTranslations(MESSAGE_FILES.COMMON);
  const locale = await getLocale();

  return (
    <section>
      <h1 className="sr-only">{t('buses_title')}</h1>
      <search className="bg-green-500 dark:bg-slate-900">
        <Container size="l" className="py-5 tablet:pt-8">
          <BreadcrumbSimple
            locale={locale}
            className="mb-4"
            items={[
              { label: t('breadcrumb_main'), href: '/' },
              { label: t('breadcrumb_buses'), href: '/buses' },
            ]}
          />

          <MainSearch />
        </Container>
      </search>
    </section>
  );
}
