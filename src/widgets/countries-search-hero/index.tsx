import MainSearch from '@/features/route-search-form';
import { BreadcrumbSimple } from '@/shared/ui/BreadcrumbSimple';
import { Container } from '@/shared/ui/Container';
import { Locale } from 'next-intl';
import { getLocale } from 'next-intl/server';

type BreadcrumbItem = { label: string; href: string };

type Props = {
  breadcrumbs: BreadcrumbItem[];
};

export default async function СountriesSearchHero({ breadcrumbs }: Props) {
  const lng = (await getLocale()) as Locale;

  return (
    <section className="bg-green-500 dark:bg-slate-900">
      <Container size="l" className="py-5">
        <div className="mb-4">
          <BreadcrumbSimple locale={lng as Locale} items={breadcrumbs} />
        </div>
        <MainSearch />
      </Container>
    </section>
  );
}
