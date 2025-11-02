import { getLocations } from '@/shared/api/location.actions';
import { ILocation } from '@/shared/types/location.types';
import Link from 'next/link';
import { Container } from '@/shared/ui/Container';
import { extractLocationDetails } from '@/shared/lib/extractLocationDetails';
import { Button } from '@/shared/ui/button';
import { AutoBreadcrumb } from '@/shared/ui/AutoBreadcrumb';
import MainSearch from '@/features/route-search-form';
import CustomCard from '@/shared/ui/CustomCard';
import { TSearchParams } from '@/shared/types/common.types';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Locale } from 'next-intl';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';

type Props = {
  params: Promise<{ lng: string; slug: string }>;
} & TSearchParams;

export async function generateMetadata({ params, searchParams }: Readonly<Props>) {
  const { lng, slug } = (await params) as { lng: Locale; slug: string };
  const query = await searchParams;

  const countryId = Number(query.cid);

  const data = await getLocations({ query: '', perPage: 2000 });
  const locations: ILocation[] = data.data;

  const t = await getTranslations({ locale: lng, namespace: MESSAGE_FILES.METADATA });

  const reference = locations.find((loc) => {
    if (countryId) return loc.country.id === countryId;

    const en = extractLocationDetails(loc, 'en').countryName.toLowerCase();
    return en === slug.toLowerCase();
  });

  if (!reference) {
    return {
      title: t('country.not_found_title'),
      description: t('country.not_found_description'),
      robots: { index: false, follow: false },
    };
  }

  const detailsEn = extractLocationDetails(reference, 'en');
  const details = extractLocationDetails(reference, lng);

  const countryName = details.countryName;
  const countrySlug = detailsEn.countryName.toLowerCase();

  const urlPath =
    `https://greenbus.com.ua/${lng}/all-countries/${countrySlug}` + (countryId ? `?cid=${countryId}` : '');

  return {
    title: t('country.title', { countryName }),
    description: t('country.description', { countryName }),
    keywords: t('country.keywords', { countryName }),

    alternates: {
      canonical: urlPath,
      languages: {
        'x-default': `https://greenbus.com.ua/uk/all-countries/${countrySlug}`,
        uk: `https://greenbus.com.ua/uk/all-countries/${countrySlug}`,
        en: `https://greenbus.com.ua/en/all-countries/${countrySlug}`,
        ru: `https://greenbus.com.ua/ru/all-countries/${countrySlug}`,
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
      title: t('country.og_title', { countryName }),
      description: t('country.og_description', { countryName }),
      url: urlPath,
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
      title: t('country.og_title', { countryName }),
      description: t('country.og_description', { countryName }),
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

export default async function CountryPage({ params, searchParams }: Props) {
  const { lng, slug } = await params;

  const queri = await searchParams;
  const countryId = Number(queri.cid);

  const data = await getLocations({ query: '', perPage: 2000 });
  const locations: ILocation[] = data.data;

  setRequestLocale(lng as Locale);

  const cityLocations = locations.filter((loc) => {
    if (countryId) {
      return loc.country.id === countryId;
    }
    const englishCountryName = extractLocationDetails(loc, 'en').countryName.toLocaleLowerCase();

    return englishCountryName === slug.toLowerCase();
  });

  return (
    <main className="bg-slate-50 dark:bg-slate-800 flex-1">
      <section className="bg-green-500 dark:bg-slate-900">
        <Container size="l" className="py-5">
          <div className="mb-4">
            <AutoBreadcrumb hideCurrent />
          </div>
          <MainSearch />
        </Container>
      </section>

      <section className="py-10">
        <Container size="l">
          <h1 className="text-2xl font-bold mb-6">
            Квитки на автобуси {extractLocationDetails(cityLocations[0], lng).countryName}
          </h1>
          <CustomCard>
            <ul className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {cityLocations.map((location) => {
                const name = extractLocationDetails(location, 'en').locationName.toLocaleLowerCase();
                const citySlug = `${name}?lid=${location.id}`;

                return (
                  <li key={location.id}>
                    <Button asChild variant={'link'}>
                      <Link href={`/${lng}/all-countries/${slug}/${citySlug}`}>
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
  );
}
