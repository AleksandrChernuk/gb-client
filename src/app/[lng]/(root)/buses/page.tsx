import { Params } from '@/shared/types/common.types';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Container } from '@/shared/ui/Container';
import MainSearch from '@/features/route-search-form';
import DateTabs from '@/features/date-pagination-routes';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { RoutesResaltInformation } from '@/widgets/routes-resalt-information';
import ResultList from '@/widgets/route-result-list';
import { generatePrivatePageMetadata } from '@/shared/lib/metadata';
import { format, isBefore, isValid } from 'date-fns';
import { redirect } from '@/shared/i18n/routing';

type Props = {
  params: Params;
};

export async function generateMetadata({ params }: Props) {
  const { lng } = (await params) as { lng: Locale };
  return generatePrivatePageMetadata({
    lng,
    namespace: MESSAGE_FILES.METADATA,
    slug: 'buses',
    path: 'buses',
  });
}

export default async function Buses({
  params,
  searchParams,
}: Readonly<{
  params: Params;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}>) {
  const { lng } = await params;
  const resolvedSearchParams = await searchParams;
  setRequestLocale(lng as Locale);

  const parseParam = (param: string | string[] | undefined): string | null => {
    if (typeof param === 'string') return param;
    if (Array.isArray(param)) return param[0];
    return null;
  };

  const fromParam = parseParam(resolvedSearchParams.from);
  const toParam = parseParam(resolvedSearchParams.to);
  const dateParam = parseParam(resolvedSearchParams.date);
  const adultParam = parseParam(resolvedSearchParams.adult);
  const childrenParam = parseParam(resolvedSearchParams.children);

  const initialValues = {
    from: fromParam && !isNaN(parseInt(fromParam)) ? parseInt(fromParam) : null,
    to: toParam && !isNaN(parseInt(toParam)) ? parseInt(toParam) : null,
    date:
      dateParam && isValid(new Date(dateParam)) && !isBefore(new Date(dateParam), new Date())
        ? dateParam
        : format(new Date(), 'yyyy-MM-dd'),
    adult: adultParam ? Math.max(1, Math.min(10, parseInt(adultParam))) : 1,
    children: childrenParam ? Math.max(0, Math.min(10, parseInt(childrenParam))) : 0,
  };

  if (!initialValues.from || !initialValues.to) {
    redirect({ href: '/', locale: lng as Locale });
  }

  return (
    <main role="main" className="pb-16 grow bg-slate-50 dark:bg-slate-800">
      <section>
        <h1 className="sr-only">SearchPage</h1>
        <search className="bg-green-500 dark:bg-slate-900">
          <Container size="l" className="py-5 tablet:pt-8 ">
            <MainSearch initialValues={initialValues} />
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
            <RoutesResaltInformation />
            <ResultList />
          </div>
        </Container>
      </section>
    </main>
  );
}
