import MainSearch from '@/features/route-search-form';
import { BreadcrumbSimple } from '@/shared/ui/BreadcrumbSimple';
import { Container } from '@/shared/ui/Container';

interface RouteHerowProps {
  fromName: string;
  toName: string;
  currentHref: string;
}

export default async function RouteHerow({ fromName, toName, currentHref }: RouteHerowProps) {
  return (
    <section className="bg-green-500 dark:bg-slate-900">
      <Container size="l" className="py-5">
        <div className="mb-4">
          <BreadcrumbSimple
            items={[
              { label: 'Головна', href: '/' },
              { label: 'Всі маршрути', href: '/routes' },
              { label: ` ${fromName} — ${toName}`, href: currentHref },
            ]}
          />
        </div>
        <MainSearch />
      </Container>
    </section>
  );
}
