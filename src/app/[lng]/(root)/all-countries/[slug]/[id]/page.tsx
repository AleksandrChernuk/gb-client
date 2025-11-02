import { getLocationById } from '@/shared/api/location.actions';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Locale } from 'next-intl';
import { Container } from '@/shared/ui/Container';
import { extractLocationDetails } from '@/shared/lib/extractLocationDetails';
import { notFound } from 'next/navigation';
import MainSearch from '@/features/route-search-form';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { BreadcrumbSimple } from '@/shared/ui/BreadcrumbSimple';
import slugify from 'slugify';
import MainFooter from '@/widgets/footer/MainFooter';
import { InfoAllCcountries } from '@/features/all-countries';
import { generateLocationMetadata } from '@/shared/lib/generateLocationMetadata';

export async function generateMetadata({ params, searchParams }: Readonly<Props>) {
  const { lng } = (await params) as { lng: Locale };
  const query = await searchParams;

  return generateLocationMetadata({
    lng,
    locationId: Number(query.to),
  });
}

type Props = {
  params: Promise<{ lng: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function LocationPage({ params, searchParams }: Props) {
  const { lng } = await params;
  setRequestLocale(lng as Locale);

  const query = await searchParams;
  const locationId = Number(query.to);

  if (!locationId) {
    notFound();
  }

  const data = await getLocationById(locationId);

  if (!data) {
    notFound();
  }

  const t = await getTranslations({ locale: lng as Locale, namespace: MESSAGE_FILES.ALL_COUNTRIES });

  const details = extractLocationDetails(data, lng);

  const slugCountry = slugify(extractLocationDetails(data, 'en').countryName.toLowerCase(), {
    lower: true,
    strict: true,
    locale: 'en',
  });

  return (
    <>
      {' '}
      <main className="bg-slate-50 dark:bg-slate-800 flex-1" role="main" aria-label={t('search_section_title')}>
        <section className="bg-green-500 dark:bg-slate-900">
          <Container size="l" className="py-5">
            <div className="mb-4">
              <BreadcrumbSimple
                items={[
                  { label: t('breadcrumbs_home'), href: '/' },
                  { label: t('breadcrumbs_all_countries'), href: `/${lng}/all-countries` },
                  { label: `${details.countryName}`, href: `/${lng}/all-countries/${slugCountry}` },
                  { label: `${details.locationName}` },
                ]}
              />
            </div>

            <MainSearch aria-label={t('search_aria_label')} />
          </Container>
        </section>

        <section className="py-10">
          <Container size="l">
            <h1 className="text-xl tablet:text-2xl font-bold mb-4">
              {t('tickets_heading', { locationName: details.locationName })}
            </h1>

            <InfoAllCcountries text={t('teaser_text', { locationName: details.locationName })} />

            <h2 className="text-lg tablet:text-xl font-bold mb-4">
              {t('about_city_heading', { locationName: details.locationName })}
            </h2>

            <div className="grid grid-cols-1 tablet:grid-cols-3 gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl mb-8 shadow-sm">
              <div className="tablet:col-span-2">
                <p className="text-sm tablet:text-lg text-slate-700 dark:text-slate-100 mb-6">{details.description}</p>
              </div>

              <div className="border-2 border-green-300 rounded-2xl">
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  className="rounded-2xl overflow-hidden "
                  src={`https://www.google.com/maps?q=${data.lat},${data.lon}&z=12&output=embed`}
                  title={t('map_title', { locationName: details.locationName })}
                  aria-label={t('map_aria_label', { locationName: details.locationName })}
                ></iframe>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <MainFooter />
    </>
  );
}
