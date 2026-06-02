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

const OWN_HOST = 'greenbus.com.ua';

function cleanPathname(pathname: string) {
  const locales = ['uk', 'ru', 'en'];
  const parts = pathname.split('/').filter(Boolean);
  if (locales.includes(parts[0])) {
    return '/' + parts.slice(1).join('/');
  }
  return pathname;
}

const parserOptions: HTMLReactParserOptions = {
  replace(domNode) {
    if (!(domNode instanceof Element)) return;
    if (domNode.name !== 'a' || !domNode.attribs?.href) return;

    const href = domNode.attribs.href;
    const isAbsolute = /^https?:\/\//i.test(href);
    const children = domNode.children as DOMNode[];

    if (isAbsolute) {
      try {
        const url = new URL(href);
        if (url.hostname === OWN_HOST || url.hostname === `www.${OWN_HOST}`) {
          const pathname = cleanPathname(url.pathname);
          return <Link href={pathname + url.search + url.hash}>{domToReact(children, parserOptions)}</Link>;
        }
      } catch {}

      return (
        <a href={href} target="_blank" rel="nofollow noopener noreferrer">
          {domToReact(children, parserOptions)}
        </a>
      );
    }

    const pathname = cleanPathname(href);
    return <Link href={pathname}>{domToReact(children, parserOptions)}</Link>;
  },
};

type Props = {
  params: Promise<{ lng: string; locationSlug: string }>;
};

export async function generateStaticParams() {
  try {
    const favorites = await getFavoriteLocations();

    return favorites.flatMap((location) =>
      location.translations.map((tr) => ({
        lng: tr.language,
        countrySlug: location.country.slug,
        locationSlug: location.slug,
      })),
    );
  } catch {
    return [];
  }
}
import { generatePublicPageMetadata } from '@/shared/lib/metadata';
import { Link } from '@/shared/i18n/routing';

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

  return {
    ...baseMetadata,
    title: current.title,
    description: current.description,
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

  return (
    <>
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
    </>
  );
}
