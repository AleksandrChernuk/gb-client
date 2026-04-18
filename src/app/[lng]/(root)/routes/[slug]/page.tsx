import { getFavoriteRouteBySlug, getFavoriteRoutes } from '@/shared/api/favoriteRoutes.server';
import { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { RouteHerow } from '@/views/favorite-route-slug/RouteHerow';
import { RouteContent } from '@/views/favorite-route-slug/RouteContent';
import MainFooter from '@/widgets/footer/MainFooter';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { generatePublicPageMetadata } from '@/shared/lib/metadata';

type Props = {
  params: Promise<{ lng: string; slug: string }>;
};

export async function generateStaticParams() {
  try {
    const res = await getFavoriteRoutes({ page: 1, perPage: 1000, lang: 'uk' });
    return res.data.map((route) => ({ slug: route.slug }));
  } catch {
    return [];
  }
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

  const title = t('route_slug.title', { fromName, toName });
  const description = t('route_slug.description', { fromName, toName }).slice(0, 160);

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
      <main className="bg-slate-50 dark:bg-slate-900">
        <RouteHerow currentHref={route.slug ?? '/'} fromName={fromName} toName={toName} />

        <RouteContent content={description ?? ''} />
      </main>
      <MainFooter />
    </>
  );
}
