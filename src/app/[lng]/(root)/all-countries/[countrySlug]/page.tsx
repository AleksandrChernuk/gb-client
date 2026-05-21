import { Container } from '@/shared/ui/Container';
import MainSearch from '@/features/route-search-form';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Locale } from 'next-intl';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { BreadcrumbSimple } from '@/shared/ui/BreadcrumbSimple';
import { notFound } from 'next/navigation';
import { getCountryBySlug } from '@/shared/api/countries.actions';
import { H1 } from '@/shared/ui/H1';
import CustomCard from '@/shared/ui/CustomCard';
import { extractLocationDetails } from '@/shared/lib/extractLocationDetails';
import { Button } from '@/shared/ui/button';
import { Link } from '@/shared/i18n/routing';
import { generatePublicPageMetadata } from '@/shared/lib/metadata';
import parse, { domToReact, HTMLReactParserOptions, Element, DOMNode } from 'html-react-parser';
import { H2 } from '@/shared/ui/H2';

type Props = {
  params: Promise<{ lng: Locale; countrySlug: string }>;
};

const META_BY_LOCALE = {
  uk: (name: string) => ({
    title: `GreenBus Автобусні квитки ${name} онлайн без комісії | GreenBus`,
    description: `Автобусні квитки зі ${name} в Україну та Європу, з України в Словаччину. Рейси з Братислави, Нітри, Кошице. Оплата картою без комісії, e-квиток на email.`,
  }),
  ru: (name: string) => ({
    title: `Автобусные билеты ${name} онлайн без комиссии | GreenBus`,
    description: `Автобусные билеты из ${name} в Украину и Европу, из Украины в Словакию. Рейсы из Братиславы, Нитры, Кошице. Оплата картой без комиссии, e-билет на email.`,
  }),
  en: (name: string) => ({
    title: `Bus Tickets ${name} Online with No Booking Fee | GreenBus`,
    description: `Bus tickets from ${name} to Ukraine and Europe, from Ukraine to Slovakia. Routes from Bratislava, Nitra, Košice. Pay by card with no booking fee, e-ticket to email.`,
  }),
} as const;

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

  return {
    ...baseMetadata,
    title: current.title,
    description: current.description,
  };
}

export default async function CountryPage({ params }: Props) {
  const { lng, countrySlug } = await params;
  setRequestLocale(lng);

  const [t, country] = await Promise.all([
    getTranslations({ locale: lng, namespace: MESSAGE_FILES.ALL_COUNTRIES }),
    getCountryBySlug(countrySlug),
  ]);

  if (!country) notFound();

  const countryName = country.translations.find((e) => e.language === lng)?.countryName ?? '';
  const countryDescription = country.description.find((e) => e.language === lng)?.description;

  const breadcrumbItems = [
    { label: t('breadcrumbs_home'), href: '/' },
    { label: t('buses_breadcrumb'), href: `/all-countries/` },
    { label: countryName, href: `/all-countries/${country.slug}/` },
  ];

  const validLocations = country.locations.filter((loc) => loc.translations.length > 0);

  return (
    <main className="bg-slate-50 dark:bg-slate-800 flex-1">
      <section className="bg-green-500 dark:bg-slate-900">
        <Container size="l" className="py-5">
          <div className="mb-4">
            <BreadcrumbSimple locale={lng} items={breadcrumbItems} />
          </div>
          <MainSearch />
        </Container>
      </section>

      <section className="py-10">
        <Container size="l">
          <H2>{t('available_cities_title', { country: countryName })}</H2>
          <CustomCard className="shadow-sm">
            <div className="flex flex-row flex-wrap items-center gap-2 my-2">
              {validLocations.length > 0 ? (
                validLocations.map((location) => (
                  <Button key={location.id} asChild variant="link" className="dark:text-green-200">
                    <Link href={`/all-countries/${country.slug}/${location.slug}/`} prefetch={false}>
                      {extractLocationDetails(location, lng).locationName}
                    </Link>
                  </Button>
                ))
              ) : (
                <p className="text-sm tablet:text-base text-slate-700 dark:text-slate-100">
                  {t('no_cities_found', { country: countryName })}
                </p>
              )}
            </div>
          </CustomCard>
        </Container>
      </section>

      <section className="pb-10">
        <Container size="l">
          <H1 className="sr-only">
            {t('bus_tickets_online')} - {countryName}
          </H1>

          {!!countryDescription ? (
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl mb-8 shadow-sm">
              <div className="text-sm tablet:text-base text-slate-700 dark:text-slate-100 prose prose-sm dark:prose-invert max-w-none">
                {parse(countryDescription, parserOptions)}
              </div>
            </div>
          ) : (
            <p></p>
          )}
        </Container>
      </section>
    </main>
  );
}
