export const revalidate = 3600;

import { getFavoriteLocations, getLocationBySlug } from '@/shared/api/location.actions';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Locale } from 'next-intl';
import { Container } from '@/shared/ui/Container';
import { extractLocationDetails } from '@/shared/lib/extractLocationDetails';
import { notFound } from 'next/navigation';
import MainSearch from '@/features/route-search-form';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { BreadcrumbSimple } from '@/shared/ui/BreadcrumbSimple';
import { H2 } from '@/shared/ui/H2';
import { RouteItem } from '@/shared/ui/route-item';

import parse, { domToReact, HTMLReactParserOptions, Element, DOMNode } from 'html-react-parser';
import { getInternalSeoHref } from '@/shared/seo/internal-links';

const parserOptions: HTMLReactParserOptions = {
  replace(domNode) {
    if (!(domNode instanceof Element)) return;
    if (domNode.name !== 'a' || !domNode.attribs?.href) return;

    const href = domNode.attribs.href;
    const internalHref = getInternalSeoHref(href);
    const isAbsolute = /^https?:\/\//i.test(href);
    const children = domNode.children as DOMNode[];

    if (internalHref) {
      return <Link href={internalHref}>{domToReact(children, parserOptions)}</Link>;
    }

    if (isAbsolute) {
      return (
        <a href={href} target="_blank" rel="nofollow noopener noreferrer">
          {domToReact(children, parserOptions)}
        </a>
      );
    }

    return <a href={href}>{domToReact(children, parserOptions)}</a>;
  },
};

type Props = {
  params: Promise<{ lng: string; locationSlug: string }>;
};

export async function generateStaticParams() {
  try {
    const favorites = await getFavoriteLocations();

    // Усі локалі для кожного міста — щоб локалізовані URL існували статично.
    return favorites.flatMap((location) =>
      routing.locales.map((lng) => ({
        lng,
        countrySlug: location.country.slug,
        locationSlug: location.slug,
      })),
    );
  } catch {
    return [];
  }
}
import { generatePublicPageMetadata } from '@/shared/lib/metadata';
import { Link, routing } from '@/shared/i18n/routing';
import MainFooter from '@/widgets/footer/MainFooter';

export async function generateMetadata({ params }: Props) {
  const { lng, locationSlug } = (await params) as { lng: Locale; locationSlug: string };

  if (!locationSlug.length) {
    return { title: 'Not Found', robots: { index: false, follow: true } };
  }

  const data = await getLocationBySlug(locationSlug);
  if (!data) {
    return { title: 'Not Found', robots: { index: false, follow: true } };
  }

  const locationName = data.translations.find((e) => e.language === lng)?.locationName ?? '';

  const meta = {
    uk: {
      title: `Автобусні квитки з ${locationName} онлайн без комісії | GreenBus `,
      description: `Купіть автобусні квитки з ${locationName} онлайн за 3 хвилини. 100+ перевізників, актуальний розклад, оплата картою без комісії — e-квиток на email.
`,
    },
    ru: {
      title: `Автобусные билеты из ${locationName} онлайн без комиссии | GreenBus`,
      description: `Купите автобусные билеты из ${locationName} онлайн за 3 минуты. 100+ перевозчиков, актуальное расписание, оплата картой без комиссии — e-билет на email.`,
    },
    en: {
      title: `Bus Tickets from ${locationName} Online with No Booking Fee | GreenBus`,
      description: `Book bus tickets from ${locationName} online in 3 minutes. 100+ carriers, up-to-date schedules, pay by card with no booking fee — e-ticket sent to your email.`,
    },
  };

  const current = meta[lng as keyof typeof meta] ?? meta.uk;

  const baseMetadata = await generatePublicPageMetadata({
    lng,
    namespace: MESSAGE_FILES.METADATA,
    slug: ``,
    path: `all-countries/${data.country.slug}/${data.slug}/`,
  });

  // Тонкі гео-сторінки без маршрутів і без опису не індексуємо (захист від index bloat),
  // але лишаємо follow, щоб краулер ходив по внутрішніх посиланнях.
  const hasRoutes = (data.favoriteRoutesFrom ?? []).some((r) => r.slug && r.fromLocation && r.toLocation);
  const hasDescription = !!extractLocationDetails(data, lng).description;
  const isThin = !hasRoutes && !hasDescription;

  return {
    ...baseMetadata,
    title: current.title,
    description: current.description,
    ...(isThin && { robots: { index: false, follow: true } }),
  };
}

export default async function LocationPage({ params }: Props) {
  const { lng, locationSlug } = await params;

  setRequestLocale(lng as Locale);

  const data = await getLocationBySlug(locationSlug);

  if (!data) {
    notFound();
  }

  if (data.slug !== locationSlug) {
    notFound();
  }

  const t = await getTranslations({ locale: lng as Locale, namespace: MESSAGE_FILES.ALL_COUNTRIES });

  const details = extractLocationDetails(data, lng);
  const popularRoutes = (data.favoriteRoutesFrom ?? [])
    .filter((route) => route.slug && route.fromLocation && route.toLocation)
    .slice(0, 6);

  // Structured data для гео-хабу: хлібні крихти + список популярних маршрутів із міста.
  const BASE = 'https://greenbus.com.ua';
  const cityUrl = `${BASE}/${lng}/all-countries/${data.country.slug}/${data.slug}/`;
  const geoSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: t('breadcrumbs_home'), item: `${BASE}/${lng}/` },
          {
            '@type': 'ListItem',
            position: 2,
            name: details.countryName,
            item: `${BASE}/${lng}/all-countries/${data.country.slug}/`,
          },
          { '@type': 'ListItem', position: 3, name: details.locationName, item: cityUrl },
        ],
      },
      ...(popularRoutes.length > 0
        ? [
            {
              '@type': 'ItemList',
              name: t('popular_routes_from_city', { locationName: details.locationName }),
              itemListElement: popularRoutes.map((route, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                url: `${BASE}/${lng}/routes/${route.slug}/`,
                name: `${extractLocationDetails(route.fromLocation, lng).locationName} — ${extractLocationDetails(route.toLocation, lng).locationName}`,
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(geoSchema) }} />
      <main className="bg-slate-50 dark:bg-slate-800 flex-1" role="main" aria-label={t('search_section_title')}>
        <section className="bg-green-500 dark:bg-slate-900">
          <Container size="l" className="py-5">
            <div className="mb-4">
              <BreadcrumbSimple
                locale={lng as Locale}
                items={[
                  { label: t('breadcrumbs_home'), href: '/' },
                  { label: t('buses_breadcrumb'), href: `/all-countries/` },
                  { label: details.countryName, href: `/all-countries/${data.country.slug}/` },
                  { label: details.locationName, href: `/all-countries/${data.country.slug}/${data.slug}/` },
                ]}
              />
            </div>

            <MainSearch aria-label={t('search_aria_label')} />
          </Container>
        </section>

        {popularRoutes.length > 0 && (
          <section className="py-10">
            <Container size="l">
              <H2 className="mb-6">{t('popular_routes_from_city', { locationName: details.locationName })}</H2>
              <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
                {popularRoutes.map((route) => {
                  const fromDetails = extractLocationDetails(route.fromLocation, lng);
                  const toDetails = extractLocationDetails(route.toLocation, lng);

                  return (
                    <RouteItem
                      key={route.id}
                      href={`/routes/${route.slug}/`}
                      fromName={fromDetails.locationName}
                      toName={toDetails.locationName}
                      fromCountry={fromDetails.countryName}
                      toCountry={toDetails.countryName}
                      price={route.price}
                    />
                  );
                })}
              </div>
            </Container>
          </section>
        )}

        <section className="py-10">
          <Container size="l">
            <h1 className="text-xl tablet:text-2xl font-bold mb-4">
              {t('about_city_heading', { locationName: details.locationName })}
            </h1>
            {!!details.description ? (
              <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl mb-8 shadow-sm">
                <div className="text-sm tablet:text-base text-slate-700 dark:text-slate-100 prose prose-sm dark:prose-invert max-w-none">
                  {parse(details.description, parserOptions)}
                </div>
              </div>
            ) : (
              <p></p>
            )}
          </Container>
        </section>
      </main>
      <MainFooter />
    </>
  );
}
