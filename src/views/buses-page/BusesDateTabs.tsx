import { Container } from '@/shared/ui/Container';
import DateTabs from '@/features/date-pagination-routes';

export function BusesDateTabs() {
  return (
    <section>
      <search className="bg-green-500 dark:bg-slate-900">
        <Container size="sm">
          <DateTabs />
        </Container>
      </search>
    </section>
  );
}
