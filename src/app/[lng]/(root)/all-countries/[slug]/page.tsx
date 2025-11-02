import { getLocations } from '@/shared/api/location.actions';
import Link from 'next/link';
import { Container } from '@/shared/ui/Container';
import { extractLocationDetails } from '@/shared/lib/extractLocationDetails';
import { Button } from '@/shared/ui/button';
import MainSearch from '@/features/route-search-form';
import CustomCard from '@/shared/ui/CustomCard';
import { TSearchParams } from '@/shared/types/common.types';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Locale } from 'next-intl';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import slugify from 'slugify';
import { BreadcrumbSimple } from '@/shared/ui/BreadcrumbSimple';
import MainFooter from '@/widgets/footer/MainFooter';
import { filterCityLocations } from '@/shared/lib/filterCityLocations';
import { notFound } from 'next/navigation';
import { InfoAllCcountries } from '@/features/all-countries';
import { generateCountryMetadata } from '@/shared/lib/generateCountryMetadata';

type Props = {
  params: Promise<{ lng: string; slug: string }>;
} & TSearchParams;

export async function generateMetadata({ params, searchParams }: Readonly<Props>) {
  const { lng, slug } = (await params) as { lng: Locale; slug: string };
  const query = await searchParams;

  const countryId = Number(query.cid);
  const data = await getLocations({ query: '', perPage: 2000 });

  return generateCountryMetadata({
    lng,
    slug,
    countryId,
    locations: data.data,
  });
}

export default async function CountryPage({ params, searchParams }: Props) {
  const { lng, slug } = await params;

  const queri = await searchParams;
  const countryId = Number(queri.cid);

  const data = await getLocations({ query: '', perPage: 2000 });

  setRequestLocale(lng as Locale);

  if (!data) {
    notFound();
  }

  const cityLocations = filterCityLocations(data.data, lng, slug, countryId);

  const t = await getTranslations({ locale: lng as Locale, namespace: MESSAGE_FILES.ALL_COUNTRIES });

  return (
    <>
      <main className="bg-slate-50 dark:bg-slate-800 flex-1">
        <section className="bg-green-500 dark:bg-slate-900">
          <Container size="l" className="py-5">
            <div className="mb-4">
              <BreadcrumbSimple
                items={[
                  { label: t('breadcrumbs_home'), href: '/' },
                  { label: t('breadcrumbs_all_countries'), href: `/${lng}/all-countries` },
                  { label: extractLocationDetails(cityLocations[0], lng).countryName },
                ]}
              />
            </div>
            <MainSearch />
          </Container>
        </section>

        <section className="py-10">
          <Container size="l">
            <h1 className="text-xl tablet:text-2xl font-bold mb-4">
              {t('bus_tickets')} {extractLocationDetails(cityLocations[0], lng).countryName}
            </h1>

            <InfoAllCcountries
              text={t('teaser_text', { locationName: extractLocationDetails(cityLocations[0], lng).countryName })}
            />

            <CustomCard className="shadow-sm">
              <ul className="flex flex-row flex-wrap items-center gap-2 my-6">
                {cityLocations.map((location) => {
                  const name = extractLocationDetails(location, 'en').locationName.toLocaleLowerCase();
                  const safeSlug = slugify(name, {
                    lower: true,
                    strict: true,
                    locale: 'en',
                  });

                  const citySlug = `${safeSlug}?to=${location.id}`;

                  return (
                    <li key={location.id}>
                      <Button asChild variant={'link'} className="dark:text-green-200">
                        <Link
                          href={`/${lng}/all-countries/${slug}/${citySlug}`}
                          prefetch={false}
                          rel="nofollow noopener noreferrer"
                        >
                          {extractLocationDetails(location, lng).locationName}
                        </Link>
                      </Button>
                    </li>
                  );
                })}
              </ul>
            </CustomCard>
          </Container>
        </section>
      </main>
      <MainFooter />
    </>
  );
}
