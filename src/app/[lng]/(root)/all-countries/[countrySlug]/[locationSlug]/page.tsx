import { getLocationBySlug } from '@/shared/api/location.actions';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Locale } from 'next-intl';
import { Container } from '@/shared/ui/Container';
import { extractLocationDetails } from '@/shared/lib/extractLocationDetails';
import { notFound } from 'next/navigation';
import MainSearch from '@/features/route-search-form';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { BreadcrumbSimple } from '@/shared/ui/BreadcrumbSimple';

import parse, { domToReact, HTMLReactParserOptions, Element, DOMNode } from 'html-react-parser';

const parserOptions: HTMLReactParserOptions = {
  replace(domNode) {
    if (!(domNode instanceof Element)) return;
    if (domNode.name !== 'a' || !domNode.attribs?.href) return;

    const href = domNode.attribs.href;
    const isExternal = /^https?:\/\//i.test(href);
    const children = domNode.children as DOMNode[];

    if (isExternal) {
      return (
        <a href={href} target="_blank">
          {domToReact(children, parserOptions)}
        </a>
      );
    }

    return <Link href={href}>{domToReact(children, parserOptions)}</Link>;
  },
};

type Props = {
  params: Promise<{ lng: string; locationSlug: string }>;
};

import { generatePublicPageMetadata } from '@/shared/lib/metadata';
import Link from 'next/link';

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
                  { label: details.locationName, href: `/all-countries/${data.slug}/` },
                ]}
              />
            </div>

            <MainSearch aria-label={t('search_aria_label')} />
          </Container>
        </section>

        <section className="py-10">
          <Container size="l">
            <h1 className="text-xl tablet:text-2xl font-bold mb-4">
              {t('about_city_heading', { locationName: details.locationName })}
            </h1>

            {/* <div className="border-2 border-green-300 rounded-2xl tablet:w-1/2">
                <iframe
                  width="100%"
                  height="500px"
                  loading="lazy"
                  className="rounded-2xl overflow-hidden"
                  src={`https://www.google.com/maps?q=${data.lat},${data.lon}&z=19&output=embed`}
                  title={t('map_title', { locationName: details.locationName })}
                  aria-label={t('map_aria_label', { locationName: details.locationName })}
                ></iframe>
              </div> */}
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
