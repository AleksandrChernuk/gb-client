import MainSearch from '@/components/modules/main-search';
import { Container } from '@/components/shared/Container';
import { Params } from '@/types/common.types';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Information } from './_modules/components/Information';
import DateTabs from './_modules/DatePicker';
import ResultList from './_modules/ResultList';

export async function generateMetadata() {
  return {
    robots: {
      index: false,
      follow: false,
      nocache: false,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function Buses({
  params,
}: Readonly<{
  params: Params;
}>) {
  const { lng } = await params;

  setRequestLocale(lng as Locale);

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
