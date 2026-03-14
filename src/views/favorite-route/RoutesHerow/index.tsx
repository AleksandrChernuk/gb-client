import MainSearch from '@/features/route-search-form';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { BreadcrumbSimple } from '@/shared/ui/BreadcrumbSimple';
import { Container } from '@/shared/ui/Container';
import { Locale } from 'next-intl';
import { getLocale, getTranslations } from 'next-intl/server';

export default async function RoutesHerow() {
  const t = await getTranslations(MESSAGE_FILES.COMMON);
  const lng = (await getLocale()) as Locale;

  return (
    <section className="bg-green-500 dark:bg-slate-900">
      <Container size="l" className="py-5">
        <div className="mb-4">
          <BreadcrumbSimple
            locale={lng}
            items={[
              { label: t('breadcrumbs_home'), href: '/' },
              { label: t('breadcrumb_popular_routes'), href: '/routes/' },
            ]}
          />
        </div>
        <MainSearch />
      </Container>
    </section>
  );
}
