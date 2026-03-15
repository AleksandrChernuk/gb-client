import { Container } from '@/shared/ui/Container';
import ResultList from '@/widgets/route-result-list';
import RouteSort from '@/features/route-sort';

export function BusesResults() {
  return (
    <section>
      <Container size="sm" className="relative">
        <div className="pt-4 pb-6 space-y-6 laptop:py-8 laptop:space-y-8">
          <RouteSort />
          <ResultList />
        </div>
      </Container>
    </section>
  );
}
