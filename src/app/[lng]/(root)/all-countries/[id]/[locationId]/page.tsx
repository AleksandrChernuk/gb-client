import { getLocationById } from '@/shared/api/location.actions';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Locale } from 'next-intl';
import { Container } from '@/shared/ui/Container';
import { extractLocationDetails } from '@/shared/lib/extractLocationDetails';
import { notFound } from 'next/navigation';
import MainSearch from '@/features/route-search-form';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { BreadcrumbSimple } from '@/shared/ui/BreadcrumbSimple';

type Props = {
  params: Promise<{ lng: string; id: string; locationId: string }>;
};

import { generatePublicPageMetadata } from '@/shared/lib/metadata';

export async function generateMetadata({ params }: Props) {
  const { lng, id, locationId } = (await params) as { lng: Locale; id: string; locationId: string };

  const cityId = Number(locationId);
  if (!cityId || isNaN(cityId)) {
    return { title: 'Not Found', robots: { index: false, follow: true } };
  }

  const data = await getLocationById(cityId);
  if (!data) {
    return { title: 'Not Found', robots: { index: false, follow: true } };
  }

  const locationName = data.translations.find((e) => e.language === lng)?.locationName ?? '';

  const meta = {
    uk: {
      title: `Купити автобусні квитки ${locationName} – ціни онлайн | GreenBus`,
      description: `Забронюйте автобусні квитки з міста ${locationName} онлайн за вигідною ціною. Актуальний розклад рейсів, порівняння цін та швидка оплата на сайті GreenBus. 🚌`,
    },
    ru: {
      title: `Купить билеты на автобус ${locationName} – цены онлайн | GreenBus`,
      description: `Билеты на автобус из города ${locationName} по лучшей цене. Сравнивайте расписание и стоимость рейсов от сотен перевозчиков. Бронируйте билеты онлайн на GreenBus за 2 минуты!`,
    },
    en: {
      title: `Bus Tickets from ${locationName}: Book Online & Prices | GreenBus`,
      description: `Find and book cheap bus tickets from ${locationName} online. Compare schedules and ticket prices from hundreds of carriers. Fast and secure booking with GreenBus.`,
    },
  };

  const current = meta[lng as keyof typeof meta] ?? meta.uk;

  const baseMetadata = await generatePublicPageMetadata({
    lng,
    namespace: MESSAGE_FILES.METADATA,
    slug: `all-countries/${id}/${locationId}/`,
    path: `all-countries/${id}/${locationId}/`,
  });

  return {
    ...baseMetadata,
    title: current.title,
    description: current.description,
    robots: { index: false, follow: true },
  };
}

export default async function LocationPage({ params }: Props) {
  const { lng, id, locationId } = await params;

  setRequestLocale(lng as Locale);

  const cityId = Number(locationId);
  const countryId = Number(id);

  if (!cityId || isNaN(cityId) || !countryId || isNaN(countryId)) {
    notFound();
  }

  const data = await getLocationById(cityId);

  if (!data) {
    notFound();
  }

  // URL должен соответствовать реальной принадлежности города стране
  if (data.countryId !== countryId) {
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
                  { label: details.countryName, href: `/all-countries/${data.country.id}/${cityId}/` },
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

            <div className="flex flex-col tablet:flex-row gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm">
              <div className="tablet:w-1/2">
                <h2 className="text-lg tablet:text-xl font-bold mb-4">
                  {t('about_city_heading', { locationName: details.locationName })}
                </h2>
                <p className="text-sm tablet:text-lg text-slate-700 dark:text-slate-100 mb-6">{details.description}</p>
              </div>

              <div className="border-2 border-green-300 rounded-2xl tablet:w-1/2">
                <iframe
                  width="100%"
                  height="500px"
                  loading="lazy"
                  className="rounded-2xl overflow-hidden"
                  src={`https://www.google.com/maps?q=${data.lat},${data.lon}&z=19&output=embed`}
                  title={t('map_title', { locationName: details.locationName })}
                  aria-label={t('map_aria_label', { locationName: details.locationName })}
                ></iframe>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
