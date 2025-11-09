import { getTranslations } from 'next-intl/server';
import { Locale } from 'next-intl';
import { getLocationById } from '@/shared/api/location.actions';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { extractLocationDetails } from '@/shared/lib/extractLocationDetails';

interface GenerateLocationMetadataParams {
  lng: Locale;
  locationId?: number;
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
