import { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

type PageType = 'public' | 'private';

const buildBaseMetadata = (
  t: Awaited<ReturnType<typeof getTranslations>>,
  lng: Locale,
  slug: string,
  pageType: PageType = 'public',
) => {
  const isPublic = pageType === 'public';

  return {
    title: t(`${slug}.title`),
    description: t(`${slug}.description`),
    keywords: t(`${slug}.keywords`) ?? '',
    appleWebApp: {
      title: 'GreenBus',
      capable: true,
      statusBarStyle: 'default' as const,
    },
    manifest: '/manifest.json',
    robots: {
      index: isPublic,
      follow: isPublic,
      nocache: !isPublic,
      googleBot: {
        index: isPublic,
        follow: isPublic,
        noimageindex: !isPublic,
        'max-video-preview': isPublic ? -1 : 0,
        'max-image-preview': isPublic ? 'large' : 'none',
        'max-snippet': isPublic ? -1 : 0,
      },
    },
    metadataBase: new URL('https://greenbus.com.ua'),
    ...(isPublic && {
      alternates: {
        canonical: `/${lng}/${slug}`,
        languages: {
          'x-default': `/uk/${slug}`,
          uk: `/uk/${slug}`,
          en: `/en/${slug}`,
          ru: `/ru/${slug}`,
        },
      },
    }),
    ...(isPublic && {
      openGraph: {
        title: t(`${slug}.title`),
        description: t(`${slug}.description`),
        url: `https://greenbus.com.ua/${lng}/${slug}`,
        siteName: 'GreenBus',
        images: [
          {
            url: '/logo.png',
            width: 512,
            height: 512,
            alt: 'GreenBus logo',
          },
        ],
        locale: lng,
        type: 'website' as const,
      },
    }),
    ...(isPublic && {
      twitter: {
        card: 'summary_large_image' as const,
        title: t(`${slug}.title`),
        description: t(`${slug}.description`),
        images: ['/logo.png'],
      },
    }),
  };
};

type BaseMetadata = ReturnType<typeof buildBaseMetadata>;

type MetadataOptions = {
  lng: Locale;
  namespace: string;
  slug: string;
  pageType?: PageType;
  overrides?: Partial<BaseMetadata>;
};

export async function createPageMetadata({ lng, namespace, slug, pageType = 'public', overrides }: MetadataOptions) {
  const t = await getTranslations({ locale: lng, namespace });
  const base = buildBaseMetadata(t, lng, slug, pageType);

  return { ...base, ...overrides };
}

export async function generatePublicPageMetadata(options: Omit<MetadataOptions, 'pageType'>) {
  return createPageMetadata({ ...options, pageType: 'public' });
}

export async function generatePrivatePageMetadata(options: Omit<MetadataOptions, 'pageType'>) {
  return createPageMetadata({ ...options, pageType: 'private' });
}
