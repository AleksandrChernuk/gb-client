import { Container } from '@/shared/ui/Container';
import MainSearch from '@/features/route-search-form';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Locale } from 'next-intl';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { BreadcrumbSimple } from '@/shared/ui/BreadcrumbSimple';
import { notFound } from 'next/navigation';
import { getAllCountries, getCountryBySlug } from '@/shared/api/countries.actions';
import { H1 } from '@/shared/ui/H1';
import CustomCard from '@/shared/ui/CustomCard';
import { extractLocationDetails } from '@/shared/lib/extractLocationDetails';
import { Link } from '@/shared/i18n/routing';
import { generatePublicPageMetadata } from '@/shared/lib/metadata';
import parse, { domToReact, HTMLReactParserOptions, Element, DOMNode } from 'html-react-parser';
import { H2 } from '@/shared/ui/H2';
import { MapPin, ChevronRight } from 'lucide-react';
import { getInternalSeoHref } from '@/shared/seo/internal-links';
import MainFooter from '@/widgets/footer/MainFooter';

type Props = {
  params: Promise<{ lng: Locale; countrySlug: string }>;
};

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const countries = await getAllCountries();

    return countries.flatMap((country) =>
      country.translations.map((tr) => ({
        lng: tr.language,
        countrySlug: country.slug,
      })),
    );
  } catch {
    return [];
  }
}

const isUkraineCountry = (name: string) => ['україна', 'украина', 'ukraine'].includes(name.trim().toLowerCase());

const META_BY_LOCALE = {
  uk: (name: string) => ({
    title: isUkraineCountry(name)
      ? 'Автобусні квитки: Україна та Європа | GreenBus'
      : `Автобусні квитки: ${name} — Україна та Європа | GreenBus`,
    description: isUkraineCountry(name)
      ? 'Знайдіть автобусні напрямки Україною та Європою, порівняйте розклад і ціни перевізників. Оплата картою без комісії, e-квиток надходить на email.'
      : `Знайдіть автобусні напрямки для ${name}, порівняйте розклад і ціни перевізників. Оплата картою без комісії, e-квиток надходить на email.`,
  }),
  ru: (name: string) => ({
    title: isUkraineCountry(name)
      ? 'Автобусные билеты: Украина и Европа | GreenBus'
      : `Автобусные билеты: ${name} — Украина и Европа | GreenBus`,
    description: isUkraineCountry(name)
      ? 'Найдите автобусные направления по Украине и Европе, сравните расписание и цены перевозчиков. Оплата картой без комиссии, e-билет приходит на email.'
      : `Найдите автобусные направления для ${name}, сравните расписание и цены перевозчиков. Оплата картой без комиссии, e-билет приходит на email.`,
  }),
  en: (name: string) => ({
    title: isUkraineCountry(name)
      ? 'Bus Tickets: Ukraine and Europe | GreenBus'
      : `Bus Tickets: ${name}, Ukraine and Europe | GreenBus`,
    description: isUkraineCountry(name)
      ? 'Find bus routes across Ukraine and Europe, compare carrier schedules and prices. Pay by card with no booking fee, and receive your e-ticket by email.'
      : `Find bus routes for ${name}, compare carrier schedules and prices. Pay by card with no booking fee, and receive your e-ticket by email.`,
  }),
} as const;

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

export async function generateMetadata({ params }: Props) {
  const { lng, countrySlug } = await params;
  const country = await getCountryBySlug(countrySlug);

  if (!country) {
    return { title: 'Not Found', robots: { index: false, follow: true } };
  }

  const countryName = country.translations.find((e) => e.language === lng)?.countryName ?? '';
  const current = (META_BY_LOCALE[lng as keyof typeof META_BY_LOCALE] ?? META_BY_LOCALE.uk)(countryName);

  const baseMetadata = await generatePublicPageMetadata({
    lng,
    namespace: MESSAGE_FILES.METADATA,
    slug: ``,
    path: `all-countries/${countrySlug}/`,
  });

  // Країна без жодного валідного міста — тонка сторінка, не індексуємо (follow лишаємо).
  const hasCities = country.locations?.some((loc) => loc.translations.length > 0) ?? false;
  const hasDescription = !!country.description?.find((e) => e.language === lng)?.description;
  const isThin = !hasCities && !hasDescription;

  return {
    ...baseMetadata,
    title: current.title,
    description: current.description,
    ...(isThin && { robots: { index: false, follow: true } }),
  };
}

export default async function CountryPage({ params }: { params: Promise<{ lng: Locale; countrySlug: string }> }) {
  const { lng, countrySlug } = await params;

  setRequestLocale(lng);

  const [t, country, allCountries] = await Promise.all([
    getTranslations({ locale: lng, namespace: MESSAGE_FILES.ALL_COUNTRIES }),
    getCountryBySlug(countrySlug),
    getAllCountries().catch(() => []),
  ]);

  if (!country) notFound();

  const countryName = country.translations.find((e) => e.language === lng)?.countryName ?? '';
  const countryDescription = country.description.find((e) => e.language === lng)?.description;

  // Межхабова перелінковка: посилання на інші країни-напрямки розподіляють вагу
  // між хабами (раніше країни не лінкувались одна на одну).
  const otherCountries = allCountries
    .filter((c) => c.slug !== country.slug)
    .map((c) => ({ slug: c.slug, name: c.translations.find((tr) => tr.language === lng)?.countryName ?? c.slug }))
    .filter((c) => c.name);

  const breadcrumbItems = [
    { label: t('breadcrumbs_home'), href: '/' },
    { label: t('buses_breadcrumb'), href: `/all-countries/` },
    { label: countryName, href: `/all-countries/${country.slug}/` },
  ];

  const validLocations = country.locations.filter((loc) => loc.translations.length > 0);

  // FAQ з реальними відповідями (оплата, повернення, e-квиток) — спільні для всіх країн-хабів.
  // Дають passage-level контент для AI Overviews і FAQPage-розмітку.
  const faqItems = [1, 2, 3, 4, 5, 6].map((i) => ({
    question: t(`seo_text.faq.q${i}`),
    answer: t(`seo_text.faq.a${i}`),
  }));

  // Structured data для країни-хабу: хлібні крихти + список міст із квитками + FAQ.
  const BASE = 'https://greenbus.com.ua';
  const geoSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: t('breadcrumbs_home'), item: `${BASE}/${lng}/` },
          { '@type': 'ListItem', position: 2, name: t('buses_breadcrumb'), item: `${BASE}/${lng}/all-countries/` },
          {
            '@type': 'ListItem',
            position: 3,
            name: countryName,
            item: `${BASE}/${lng}/all-countries/${country.slug}/`,
          },
        ],
      },
      ...(validLocations.length > 0
        ? [
            {
              '@type': 'ItemList',
              name: t('available_cities_title', { country: countryName }),
              itemListElement: validLocations.map((loc, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                url: `${BASE}/${lng}/all-countries/${country.slug}/${loc.slug}/`,
                name: extractLocationDetails(loc, lng).locationName,
              })),
            },
          ]
        : []),
      {
        '@type': 'FAQPage',
        inLanguage: lng,
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
    ],
  };

  return (
    <>
      {' '}
      <main className="bg-slate-50 dark:bg-slate-800 flex-1">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(geoSchema) }} />
        <section className="bg-green-500 dark:bg-slate-900">
          <Container size="l" className="py-5">
            <div className="mb-4">
              <BreadcrumbSimple locale={lng} items={breadcrumbItems} />
            </div>
            <MainSearch />
          </Container>
        </section>

        <section className="pt-8 pb-2">
          <Container size="l">
            <H1 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white tablet:text-3xl">
              {isUkraineCountry(countryName) ? t('country_h1_ua') : t('country_h1', { country: countryName })}
            </H1>
            <p className="max-w-3xl text-sm text-slate-600 dark:text-slate-300 tablet:text-base">
              {isUkraineCountry(countryName) ? t('country_lead_ua') : t('country_lead', { country: countryName })}
            </p>
          </Container>
        </section>

        <section className="py-10">
          <Container size="l">
            <H2 className="mb-6">{t('available_cities_title', { country: countryName })}</H2>
            {validLocations.length > 0 ? (
              <ul className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-3 tablet:gap-4">
                {validLocations.map((location) => (
                  <li key={location.id}>
                    <Link
                      href={`/all-countries/${country.slug}/${location.slug}/`}
                      prefetch={false}
                      className="group relative flex items-center justify-between w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-green-500 dark:hover:border-green-400 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 shrink-0 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <span className="text-base font-semibold text-slate-800 dark:text-slate-100 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors line-clamp-1">
                          {extractLocationDetails(location, lng).locationName}
                        </span>
                      </div>
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 group-hover:bg-green-50 dark:group-hover:bg-green-900/30 transition-colors shrink-0 ml-2">
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-all group-hover:translate-x-0.5 duration-300" />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <CustomCard className="shadow-sm">
                <p className="text-sm tablet:text-base text-slate-700 dark:text-slate-100">
                  {t('no_cities_found', { country: countryName })}
                </p>
              </CustomCard>
            )}
          </Container>
        </section>

        <section className="pb-4">
          <Container size="l">
            <H2 className="mb-6">{t('seo_text.faq.title')}</H2>
            <div className="flex flex-col gap-3">
              {faqItems.map((item, i) => (
                <details
                  key={i}
                  className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                  <summary className="cursor-pointer list-none text-sm font-semibold text-slate-800 marker:content-none dark:text-slate-100 tablet:text-base">
                    {item.question}
                  </summary>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 tablet:text-base">{item.answer}</p>
                </details>
              ))}
            </div>
          </Container>
        </section>

        <section className="pb-10">
          <Container size="l">
            {!!countryDescription ? (
              <div className="text-sm tablet:text-base text-slate-700 dark:text-slate-100 prose prose-sm dark:prose-invert max-w-none bg-white dark:bg-slate-900 p-4 rounded-2xl mb-8 shadow-s">
                {parse(countryDescription, parserOptions)}
              </div>
            ) : null}
          </Container>
        </section>

        <section className="pb-10">
          <Container size="l">
            <H2 className="mb-4">{t('other_directions_title')}</H2>
            <div className="flex flex-wrap gap-2">
              {otherCountries.map((c) => (
                <Link
                  key={c.slug}
                  href={`/all-countries/${c.slug}/`}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-green-500 hover:text-green-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-green-400 dark:hover:text-green-400"
                >
                  {c.name}
                </Link>
              ))}
              <Link
                href="/routes/"
                className="rounded-full border border-green-500 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700 transition-colors hover:bg-green-100 dark:border-green-400 dark:bg-green-900/30 dark:text-green-300"
              >
                {t('all_routes_link')}
              </Link>
            </div>
          </Container>
        </section>
      </main>
      <MainFooter />
    </>
  );
}
