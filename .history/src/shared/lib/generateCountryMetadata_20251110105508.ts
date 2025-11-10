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

// ✅ Хелпер для формування URL країни з правильними префіксами
function buildCountryUrl(locale: Locale, countrySlug: string, countryId?: number): string {
  const baseUrl = 'https://greenbus.com.ua';
  const path = `all-countries/${countrySlug}`;
  const query = countryId ? `?cid=${countryId}` : '';

  return `${baseUrl}/${locale}/${path}${query}`;
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

  // ✅ Canonical URL для поточної мови
  const canonicalUrl = buildCountryUrl(lng, countrySlug, countryId);

  // ✅ Динамічний manifest в залежності від мови
  const manifestPath = lng === 'uk' ? '/manifest.json' : `/manifest.${lng}.json`;

  return {
    title: t('country.title', { countryName }),
    description: t('country.description', { countryName }),
    keywords: t('country.keywords', { countryName }),

    alternates: {
      canonical: canonicalUrl,
      languages: {
        // ✅ x-default вказує на українську версію БЕЗ префікса
        'x-default': buildCountryUrl('uk', countrySlug, countryId),
        // ✅ uk БЕЗ префікса
        uk: buildCountryUrl('uk', countrySlug, countryId),
        // ✅ ru З префіксом /ru
        ru: buildCountryUrl('ru', countrySlug, countryId),
        // ✅ en З префіксом /en
        en: buildCountryUrl('en', countrySlug, countryId),
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
      url: canonicalUrl,
      type: 'website',
      siteName: 'GreenBus',
      locale: lng,
      images: [
        {
          url: 'https://greenbus.com.ua/og-image.png',
          width: 1200,
          height: 630,
          alt: `GreenBus - ${countryName}`,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: t('country.og_title', { countryName }),
      description: t('country.og_description', { countryName }),
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
