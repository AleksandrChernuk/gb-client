import MainSearch from '@/components/modules/main-search';
import { Container } from '@/components/shared/Container';
import DateTabs from './modules/DatePicker';
import ResultList from './modules/ResultList';
import { Information } from './components/Information';

export async function BusesPage() {
  return (
    <main role="main" className="pb-16 grow bg-slate-50 dark:bg-slate-800">
      <section>
        <h1 className="sr-only">SearchPage</h1>
        <search className="bg-green-500 dark:bg-slate-900">
          <Container size="l" className="py-5 tablet:pt-8 ">
            <MainSearch />
          </Container>
        </search>
      </section>

      <section>
        <search className="bg-green-500 dark:bg-slate-900">
          <Container size="sm">
            <DateTabs />
          </Container>
        </search>
      </section>

      <section>
        <Container size="sm" className="relative">
          <div className="pt-4 pb-6 space-y-6 te laptop:py-8 laptop:space-y-8">
            <Information />
            <ResultList />
          </div>
        </Container>
      </section>
    </main>
  );
}
