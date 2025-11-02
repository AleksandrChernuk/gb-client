import { getLocationById } from '@/shared/api/location.actions';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Locale } from 'next-intl';
import { Container } from '@/shared/ui/Container';
import { extractLocationDetails } from '@/shared/lib/extractLocationDetails';
import { notFound } from 'next/navigation';
import { AutoBreadcrumb } from '@/shared/ui/AutoBreadcrumb';
import MainSearch from '@/features/route-search-form';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';

export async function generateMetadata({ params, searchParams }: Readonly<Props>) {
  const { lng } = (await params) as { lng: Locale };
  const query = await searchParams;

  const locationId = Number(query.lid);
  const t = await getTranslations({ locale: lng, namespace: MESSAGE_FILES.METADATA });

  // ---- Если параметра нет ----
  if (!locationId) {
    return {
      title: t('location.not_found_title'),
      description: t('location.not_found_description'),
      robots: { index: false, follow: false },
    };
  }

  const data = await getLocationById(locationId);

  if (!data) {
    return {
      title: t('location.not_found_title'),
      description: t('location.not_found_description'),
      robots: { index: false, follow: false },
    };
  }

  const en = extractLocationDetails(data, 'en');
  const details = extractLocationDetails(data, lng);

  const city = en.locationName.toLowerCase();
  const country = en.countryName.toLowerCase();

  const displayCity = details.locationName;
  const displayCountry = details.countryName;

  const url = `https://greenbus.com.ua/${lng}/all-countries/${country}/${city}?lid=${locationId}`;

  return {
    title: t('location.title', { city: displayCity, countryName: displayCountry }),
    description: t('location.description', { city: displayCity }),
    keywords: t('location.keywords', { city: displayCity, countryName: displayCountry }),

    alternates: {
      canonical: url,
      languages: {
        'x-default': `https://greenbus.com.ua/uk/all-countries/${country}/${city}?lid=${locationId}`,
        uk: `https://greenbus.com.ua/uk/all-countries/${country}/${city}?lid=${locationId}`,
        en: `https://greenbus.com.ua/en/all-countries/${country}/${city}?lid=${locationId}`,
        ru: `https://greenbus.com.ua/ru/all-countries/${country}/${city}?lid=${locationId}`,
      },
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        maxSnippet: -1,
        maxImagePreview: 'large',
        maxVideoPreview: -1,
      },
    },

    openGraph: {
      title: t('location.og_title', { city: displayCity, countryName: displayCountry }),
      description: t('location.og_description', { city: displayCity }),
      url,
      type: 'website',
      siteName: 'GreenBus',
      locale: lng,
      images: [
        {
          url: 'https://greenbus.com.ua/apple-touch-icon.png',
          width: 512,
          height: 512,
          alt: 'GreenBus Logo',
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: t('location.og_title', { city: displayCity, countryName: displayCountry }),
      description: t('location.og_description', { city: displayCity }),
      images: ['https://greenbus.com.ua/apple-touch-icon.png'],
    },

    appleWebApp: {
      title: 'GreenBus',
      capable: true,
      statusBarStyle: 'default',
    },

    manifest: '/manifest.json',
    metadataBase: new URL('https://greenbus.com.ua'),
  };
}

type Props = {
  params: Promise<{ lng: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function LocationPage({ params, searchParams }: Props) {
  const { lng } = await params;
  setRequestLocale(lng as Locale);

  const query = await searchParams;
  const locationId = Number(query.lid);

  if (!locationId) {
    notFound();
  }

  const data = await getLocationById(locationId);

  if (!data) {
    notFound();
  }

  const t = await getTranslations({ locale: lng as Locale, namespace: MESSAGE_FILES.ALL_COUNTRIES });

  const details = extractLocationDetails(data, lng);

  return (
    <main className="bg-slate-50 dark:bg-slate-800 flex-1" role="main" aria-label={t('search_section_title')}>
      <section className="bg-green-500 dark:bg-slate-900">
        <Container size="l" className="py-5">
          <div className="mb-4">
            <AutoBreadcrumb hideCurrent />
          </div>

          <MainSearch aria-label={t('search_aria_label')} />
        </Container>
      </section>

      <section className="py-10">
        <Container size="l">
          <h1 className="text-xl tablet:text-2xl font-bold mb-4">
            {t('tickets_heading', { locationName: details.locationName })}
          </h1>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl mb-8 shadow-sm">
            <p className="text-sm text-slate-700 dark:text-slate-100">
              {t('teaser_text', { locationName: details.locationName })}
            </p>
          </div>

          <h2 className="text-lg tablet:text-xl font-bold mb-4">
            {t('about_city_heading', { locationName: details.locationName })}
          </h2>

          <div className="grid grid-cols-1 tablet:grid-cols-3 gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl mb-8 shadow-sm">
            <div className="tablet:col-span-2">
              {/* описание остаётся как есть, оно приходит из API */}
              <p className="text-sm tablet:text-lg text-slate-700 dark:text-slate-100 mb-6">{details.description}</p>
            </div>

            <div className="border-2 border-green-300 rounded-2xl">
              <iframe
                width="100%"
                height="350"
                loading="lazy"
                className="rounded-2xl overflow-hidden"
                src={`https://www.google.com/maps?q=${data.lat},${data.lon}&z=12&output=embed`}
                title={t('map_title', { locationName: details.locationName })}
                aria-label={t('map_aria_label', { locationName: details.locationName })}
              ></iframe>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
