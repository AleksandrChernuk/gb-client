'use client';

import { Container } from '@/shared/ui/Container';
import ResultList from '@/widgets/route-result-list';
import { useRouterSearch } from '@/shared/hooks/useRouterSearch';

interface RouteResultsProps {
  heading?: React.ReactNode;
}

export function RouteResults({ heading }: RouteResultsProps) {
  const [params] = useRouterSearch();

  // Без обраних from/to не рендеримо секцію взагалі — інакше порожні паддинги
  // створюють великий зазор між блоками.
  if (!params.from || !params.to) return null;

  return (
    <section>
      <Container size="l" className="relative">
        <div className="pt-6 pb-8 laptop:py-10">
          <ResultList showMissingSearchError={false} heading={heading} />
        </div>
      </Container>
    </section>
  );
}
