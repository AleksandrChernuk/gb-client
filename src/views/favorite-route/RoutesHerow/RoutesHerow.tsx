import MainSearch from '@/features/route-search-form';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { BreadcrumbSimple } from '@/shared/ui/BreadcrumbSimple';
import { Container } from '@/shared/ui/Container';
import { getTranslations } from 'next-intl/server';

export default async function RoutesHerow() {
  const t = await getTranslations(MESSAGE_FILES.COMMON);

  return (
    <section className="bg-green-500 dark:bg-slate-900">
      <Container size="l" className="py-5">
        <div className="mb-4">
          <BreadcrumbSimple items={[{ label: t('breadcrumbs_home'), href: '/' }]} />
        </div>
        <MainSearch />
      </Container>
    </section>
  );
}
