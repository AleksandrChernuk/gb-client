import { getTranslations } from 'next-intl/server';
import { Locale } from 'next-intl';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { extractLocationDetails } from '@/shared/lib/extractLocationDetails';
import { ILocation } from '@/shared/types/location.types';

interface GenerateCountryMetadataParams {
  lng: Locale;
  slug: string;
  countryId?: number;
  locations: ILocation[];
}

export async function generateCountryMetadata({ lng, slug, countryId, locations }: GenerateCountryMetadataParams) {
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
