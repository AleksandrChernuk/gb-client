import { Suspense } from 'react';
import {
  getAllFavoriteRoutes,
  getFavoriteRouteBySlug,
  isFavoriteRouteNotFoundError,
} from '@/shared/api/favoriteRoutes.server';
import { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { permanentRedirect } from 'next/navigation';
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
  try {
    const routes = await getAllFavoriteRoutes({ lang: 'uk' });

    return locales.flatMap((lng) => routes.map((route) => ({ lng, slug: route.slug })));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props) {
  const { lng, slug } = (await params) as { lng: Locale; slug: string };

  let route;
  try {
    route = await getFavoriteRouteBySlug({ slug });
  } catch (error) {
    if (isFavoriteRouteNotFoundError(error)) {
      return { title: 'Not Found', robots: { index: false, follow: true } };
    }

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
  } catch (error) {
    if (isFavoriteRouteNotFoundError(error)) {
      permanentRedirect(`/${lng}/routes/`);
    }

    throw error;
  }

  if (!route) {
    permanentRedirect(`/${lng}/routes/`);
  }

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
                <RouteSort hideWithoutSearchParams />
              </Suspense>
              <Suspense fallback={null}>
                <ResultList showMissingSearchError={false} />
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
