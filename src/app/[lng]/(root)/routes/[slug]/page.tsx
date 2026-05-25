import { Suspense } from 'react';
import { getFavoriteRouteBySlug, getFavoriteRoutes } from '@/shared/api/favoriteRoutes.server';
import { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { RouteHerow } from '@/views/favorite-route-slug/RouteHerow';
import { RouteContent } from '@/views/favorite-route-slug/RouteContent';
import MainFooter from '@/widgets/footer/MainFooter';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { generatePublicPageMetadata } from '@/shared/lib/metadata';
import { RouteSchema } from '@/views/favorite-route-slug/RouteSchema';
import { locales } from '@/shared/i18n/locales';
import ResultList from '@/widgets/route-result-list';
import { Container } from '@/shared/ui/Container';
import RouteSort from '@/features/route-sort';
import { BusesDateTabs } from '@/views/buses-page/BusesDateTabs';

type Props = {
  params: Promise<{ lng: string; slug: string }>;
};

export async function generateStaticParams() {
  const results = await Promise.all(
    locales.map(async (lng) => {
      try {
        const res = await getFavoriteRoutes({ page: 1, perPage: 1000, lang: lng });
        return res.data.map((route) => ({ lng, slug: route.slug }));
      } catch {
        return [];
      }
    }),
  );

  return results.flat();
}

export async function generateMetadata({ params }: Props) {
  const { lng, slug } = (await params) as { lng: Locale; slug: string };

  let route;
  try {
    route = await getFavoriteRouteBySlug({ slug });
  } catch {
    return { title: 'Not Found', robots: { index: false, follow: true } };
  }

  if (!route) return { title: 'Not Found', robots: { index: false, follow: true } };

  const fromName = route.fromLocation?.translations?.find((t) => t.language === lng)?.locationName ?? '';
  const toName = route.toLocation?.translations?.find((t) => t.language === lng)?.locationName ?? '';

  const t = await getTranslations({ locale: lng, namespace: MESSAGE_FILES.METADATA });

  const title = t('route_slug.title', { fromName, toName, price: route.price ?? '' });
  const description = t('route_slug.description', {
    fromName,
    toName,
    price: route.price ?? '',
  });

  return await generatePublicPageMetadata({
    lng,
    namespace: MESSAGE_FILES.METADATA,
    slug: 'route',
    path: `routes/${slug}/`,
    overrides: { title, description },
  });
}

export default async function FavoriteRoutePage({ params }: Props) {
  const { lng, slug } = await params;

  setRequestLocale(lng as Locale);

  let route;
  try {
    route = await getFavoriteRouteBySlug({ slug });
  } catch {
    notFound();
  }

  if (!route) notFound();

  const fromName = route.fromLocation?.translations?.find((t) => t.language === lng)?.locationName ?? '—';
  const toName = route.toLocation?.translations?.find((t) => t.language === lng)?.locationName ?? '—';
  const description = route.description?.find((d) => d.language === lng)?.description;

  return (
    <>
      <RouteSchema route={route} lng={lng as Locale} host={'https://greenbus.com.ua'} />
      <main className="bg-slate-50 dark:bg-slate-900">
        <RouteHerow currentHref={route.slug ?? '/'} fromName={fromName} toName={toName} />
        <Suspense fallback={null}>
          <BusesDateTabs />
        </Suspense>
        <section>
          <Container size="sm" className="relative">
            <div className="pt-4 pb-6 space-y-6 laptop:py-8 laptop:space-y-8">
              <Suspense fallback={null}>
                <RouteSort />
              </Suspense>
              <Suspense fallback={null}>
                <ResultList />
              </Suspense>
            </div>
          </Container>
        </section>
        <RouteContent content={description ?? ''} />
      </main>
      <MainFooter />
    </>
  );
}
