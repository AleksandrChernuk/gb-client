import { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

type PageType = 'public' | 'private';

const buildBaseMetadata = (
  t: Awaited<ReturnType<typeof getTranslations>>,
  lng: Locale,
  slug: string, // для переводов
  path: string, // для URL и ссылок
  pageType: PageType = 'public',
) => {
  const isPublic = pageType === 'public';
  const baseUrl = 'https://greenbus.com.ua';
  const fullPath = path ? `/${lng}/${path}` : `/${lng}`;

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
      icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon.ico',
        apple: [
          { url: '/apple-touch-icon.png' },
          { url: '/apple-touch-icon-57x57.png', sizes: '57x57', type: 'image/png' },
          { url: '/apple-touch-icon-72x72.png', sizes: '72x72', type: 'image/png' },
          { url: '/apple-touch-icon-76x76.png', sizes: '76x76', type: 'image/png' },
          { url: '/apple-touch-icon-114x114.png', sizes: '114x114', type: 'image/png' },
          { url: '/apple-touch-icon-120x120.png', sizes: '120x120', type: 'image/png' },
          { url: '/apple-touch-icon-144x144.png', sizes: '144x144', type: 'image/png' },
          { url: '/apple-touch-icon-152x152.png', sizes: '152x152', type: 'image/png' },
          { url: '/apple-touch-icon-180x180.png', sizes: '180x180', type: 'image/png' },
        ],
      },
    },
    metadataBase: new URL(baseUrl),
    ...(isPublic && {
      alternates: {
        canonical: fullPath,
        languages: {
          'x-default': `/uk${path ? `/${path}` : ''}`,
          uk: `/uk${path ? `/${path}` : ''}`,
          en: `/en${path ? `/${path}` : ''}`,
          ru: `/ru${path ? `/${path}` : ''}`,
        },
      },
    }),
    ...(isPublic && {
      openGraph: {
        title: t(`${slug}.title`),
        description: t(`${slug}.description`),
        url: `${baseUrl}${fullPath}`,
        siteName: 'GreenBus',
        images: [
          {
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
      },
    }),
  };
};

type BaseMetadata = ReturnType<typeof buildBaseMetadata>;

type MetadataOptions = {
  lng: Locale;
  namespace: string;
  slug: string;
  path?: string;
  pageType?: PageType;
  overrides?: Partial<BaseMetadata>;
};

export async function createPageMetadata({
  lng,
  namespace,
  slug,
  path = '',
  pageType = 'public',
  overrides,
}: MetadataOptions) {
  const t = await getTranslations({ locale: lng, namespace });
  const base = buildBaseMetadata(t, lng, slug, path, pageType);
  return { ...base, ...overrides };
}

export async function generatePublicPageMetadata(options: Omit<MetadataOptions, 'pageType'>) {
  return createPageMetadata({ ...options, pageType: 'public' });
}

export async function generatePrivatePageMetadata(options: Omit<MetadataOptions, 'pageType'>) {
  return createPageMetadata({ ...options, pageType: 'private' });
}
