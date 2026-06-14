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
import RouteLead from '@/views/favorite-route-slug/RouteLead';
import { RouteContent } from '@/views/favorite-route-slug/RouteContent';
import MainFooter from '@/widgets/footer/MainFooter';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { generatePublicPageMetadata } from '@/shared/lib/metadata';
import { RouteSchema } from '@/views/favorite-route-slug/RouteSchema';
import { locales } from '@/shared/i18n/locales';
import { RouteResults } from '@/views/favorite-route-slug/RouteResults';
import { getRouteRobotsForSearchParams } from '@/shared/seo/route-query-indexing';

type Props = {
  params: Promise<{ lng: string; slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateStaticParams() {
  try {
    const routes = await getAllFavoriteRoutes({ lang: 'uk' });

    return locales.flatMap((lng) => routes.map((route) => ({ lng, slug: route.slug })));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params, searchParams }: Props) {
  const { lng, slug } = (await params) as { lng: Locale; slug: string };
  const robots = getRouteRobotsForSearchParams((await searchParams) ?? {});

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
    overrides: { title, description, ...(robots && { robots }) },
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

  const tMeta = await getTranslations({ locale: lng as Locale, namespace: MESSAGE_FILES.METADATA });
  const hasNames = fromName !== '—' && toName !== '—';
  const endpointLinks = [
    route.fromLocation?.slug && route.fromLocation?.country?.slug
      ? {
          href: `/all-countries/${route.fromLocation.country.slug}/${route.fromLocation.slug}/`,
          label: fromName,
        }
      : null,
    route.toLocation?.slug && route.toLocation?.country?.slug
      ? {
          href: `/all-countries/${route.toLocation.country.slug}/${route.toLocation.slug}/`,
          label: toName,
        }
      : null,
  ].filter((link): link is { href: string; label: string } => Boolean(link && link.label !== '—'));

  return (
    <>
      <RouteSchema route={route} lng={lng as Locale} host={'https://greenbus.com.ua'} />
      <main className="bg-slate-50 dark:bg-slate-800">
        <RouteHerow currentHref={route.slug ?? '/'} fromName={fromName} toName={toName} />
        <RouteLead fromName={fromName} toName={toName} price={route.price} lng={lng as Locale} />
        <Suspense fallback={null}>
          <RouteResults
            heading={
              hasNames ? (
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-50 tablet:text-2xl">
                  {tMeta('route_slug.results_heading', { fromName, toName })}
                </h2>
              ) : null
            }
          />
        </Suspense>
        <RouteContent content={description ?? ''} endpointLinks={endpointLinks} />
      </main>
      <MainFooter />
    </>
  );
}
