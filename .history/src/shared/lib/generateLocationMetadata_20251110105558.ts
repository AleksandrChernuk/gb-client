import { getTranslations } from 'next-intl/server';
import { Locale } from 'next-intl';
import { getLocationById } from '@/shared/api/location.actions';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { extractLocationDetails } from '@/shared/lib/extractLocationDetails';

interface GenerateLocationMetadataParams {
  lng: Locale;
  locationId?: number;
}

// ✅ Хелпер для формування URL з правильними префіксами
function buildLocationUrl(locale: Locale, country: string, city: string, locationId: number): string {
  const baseUrl = 'https://greenbus.com.ua';
  const path = `all-countries/${country}/${city}`;
  const query = `?lid=${locationId}`;

  return `${baseUrl}/${locale}/${path}${query}`;
}

export async function generateLocationMetadata({ lng, locationId }: GenerateLocationMetadataParams) {
  const t = await getTranslations({ locale: lng, namespace: MESSAGE_FILES.METADATA });

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

  // ✅ Canonical URL для поточної мови
  const canonicalUrl = buildLocationUrl(lng, country, city, locationId);

  // ✅ Динамічний manifest в залежності від мови
  const manifestPath = lng === 'uk' ? '/manifest.json' : `/manifest.${lng}.json`;

  return {
    title: t('location.title', { city: displayCity, countryName: displayCountry }),
    description: t('location.description', { city: displayCity }),
    keywords: t('location.keywords', { city: displayCity, countryName: displayCountry }),

    alternates: {
      canonical: canonicalUrl,
      languages: {
        // ✅ x-default вказує на українську версію БЕЗ префікса
        'x-default': buildLocationUrl('uk', country, city, locationId),
        // ✅ uk БЕЗ префікса
        uk: buildLocationUrl('uk', country, city, locationId),
        // ✅ ru З префіксом /ru
        ru: buildLocationUrl('ru', country, city, locationId),
        // ✅ en З префіксом /en
        en: buildLocationUrl('en', country, city, locationId),
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
      url: canonicalUrl,
      type: 'website',
      siteName: 'GreenBus',
      locale: lng,
      images: [
        {
          url: 'https://greenbus.com.ua/og-image.png',
          width: 1200,
          height: 630,
          alt: `GreenBus - ${displayCity}, ${displayCountry}`,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: t('location.og_title', { city: displayCity, countryName: displayCountry }),
      description: t('location.og_description', { city: displayCity }),
      images: ['https://greenbus.com.ua/og-image.png'],
    },

    appleWebApp: {
      title: 'GreenBus',
      capable: true,
      statusBarStyle: 'default',
    },

    manifest: manifestPath,
    metadataBase: new URL('https://greenbus.com.ua'),
  };
}
