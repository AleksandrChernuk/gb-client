import { Container } from '@/shared/ui/Container';
import MainSearch from '@/features/route-search-form';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Locale } from 'next-intl';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { BreadcrumbSimple } from '@/shared/ui/BreadcrumbSimple';
import { notFound } from 'next/navigation';
import { getCountryById } from '@/shared/api/countries.actions';
import { H1 } from '@/shared/ui/H1';
import CustomCard from '@/shared/ui/CustomCard';
import { extractLocationDetails } from '@/shared/lib/extractLocationDetails';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { generatePublicPageMetadata } from '@/shared/lib/metadata';

type Props = {
  params: Promise<{ lng: string; id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { lng, id } = (await params) as { lng: Locale; id: string };

  const countryId = Number(id);
  if (!countryId || isNaN(countryId)) {
    return { title: 'Not Found', robots: { index: false, follow: true } };
  }

  const country = await getCountryById(countryId);
  if (!country) {
    return { title: 'Not Found', robots: { index: false, follow: true } };
  }

  const countryName = country.translations.find((e) => e.language === lng)?.countryName ?? '';

  const meta = {
    uk: {
      title: `Купити автобусні квитки ${countryName} – ціни онлайн | GreenBus`,
      description: `Забронюйте автобусні квитки до ${countryName} онлайн за вигідною ціною. Актуальний розклад рейсів, порівняння цін та швидка оплата на сайті GreenBus. 🚌`,
    },
    ru: {
      title: `Купить билеты на автобус ${countryName} – цены онлайн | GreenBus`,
      description: `Билеты на автобус в ${countryName} по лучшей цене. Сравнивайте расписание и стоимость рейсов от сотен перевозчиков. Бронируйте билеты онлайн на GreenBus за 2 минуты!`,
    },
    en: {
      title: `Bus Tickets to ${countryName}: Book Online & Prices | GreenBus`,
      description: `Find and book cheap bus tickets to ${countryName} online. Compare schedules and ticket prices from hundreds of carriers. Fast and secure booking with GreenBus.`,
    },
  };

  const current = meta[lng as keyof typeof meta] ?? meta.uk;

  const baseMetadata = await generatePublicPageMetadata({
    lng,
    namespace: MESSAGE_FILES.METADATA,
    slug: `all-countries/${id}/`,
    path: `all-countries/${id}/`,
  });

  return {
    ...baseMetadata,
    title: current.title,
    description: current.description,
    robots: { index: false, follow: true },
  };
}

export default async function CountryPage({ params }: Props) {
  const { lng, id } = (await params) as { lng: Locale; id: string };

  setRequestLocale(lng);

  const countryId = Number(id);
  if (!countryId || isNaN(countryId)) {
    notFound();
  }

  const country = await getCountryById(countryId);
  if (!country) {
    notFound();
  }

  const t = await getTranslations({ locale: lng, namespace: MESSAGE_FILES.ALL_COUNTRIES });

  const countryName = country.translations.find((e) => e.language === lng)?.countryName ?? '';
  const countryDescription = country.description.find((e) => e.language === lng)?.description;

  return (
    <>
      <main className="bg-slate-50 dark:bg-slate-800 flex-1">
        <section className="bg-green-500 dark:bg-slate-900">
          <Container size="l" className="py-5">
            <div className="mb-4">
              <BreadcrumbSimple
                locale={lng}
                items={[
                  { label: t('breadcrumbs_home'), href: '/' },
                  { label: t('buses_breadcrumb'), href: `/all-countries/` },
                  {
                    label: countryName,
                    href: `/all-countries/${country.id}/`,
                  },
                ]}
              />
            </div>
            <MainSearch />
          </Container>
        </section>

        <section className="py-10">
          <Container size="l">
            <H1>
              {countryName} - {t('bus_tickets_online')}
            </H1>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl mb-8 shadow-sm">
              <p className="text-sm tablet:text-base text-slate-700 dark:text-slate-100">
                {countryDescription ?? t('no_description_placeholder', { country: countryName })}
              </p>
            </div>

            <CustomCard className="shadow-sm">
              <div className="flex flex-row flex-wrap items-center gap-2 my-6">
                {country.locations.length > 0 ? (
                  country.locations.map((location) => {
                    if (!location.translations.length) return null;
                    return (
                      <div key={location.id}>
                        <Button asChild variant={'link'} className="dark:text-green-200">
                          <Link href={`/all-countries/${country.id}/${location.id}/`} prefetch={false}>
                            {extractLocationDetails(location, lng).locationName}
                          </Link>
                        </Button>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm tablet:text-base text-slate-700 dark:text-slate-100">
                    {t('no_cities_found', { country: countryName })}
                  </p>
                )}
              </div>
            </CustomCard>
          </Container>
        </section>
      </main>
    </>
  );
}
