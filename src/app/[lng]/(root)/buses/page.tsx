import { Params } from '@/shared/types/common.types';
import { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Container } from '@/shared/ui/Container';
import MainSearch from '@/features/route-search-form';
import DateTabs from '@/features/date-pagination-routes';
import MainFooter from '@/widgets/footer/MainFooter';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { RoutesResaltInformation } from '@/widgets/routes-resalt-information';
import ResultList from '@/widgets/route-result-list';

type Props = {
  params: Params;
};

export async function generateMetadata({ params }: Props) {
  const { lng } = (await params) as { lng: Locale };
  const t = await getTranslations({
    locale: lng,
    namespace: MESSAGE_FILES.METADATA,
  });

  return {
    title: t('buses.title'),
    description: t('buses.description'),
    keywords: t('buses.keywords'),

    appleWebApp: {
      title: 'GreenBus',
      capable: true,
      statusBarStyle: 'default',
    },

    manifest: '/manifest.json',

    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    metadataBase: new URL('https://greenbus.com.ua'),

    alternates: {
      canonical: `/${lng}/buses`,
      languages: {
        'x-default': '/uk/buses',
        uk: '/uk/buses',
        en: '/en/buses',
        ru: '/ru/buses',
      },
    },

    openGraph: {
      images: '/logo.png',
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
    <>
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
              <RoutesResaltInformation />
              <ResultList />
            </div>
          </Container>
        </section>
      </main>
      <MainFooter className="dark:bg-slate-900" />
    </>
  );
}
