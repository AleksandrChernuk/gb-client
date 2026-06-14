import { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

type PageType = 'public' | 'private';

const buildBaseMetadata = (
  t: Awaited<ReturnType<typeof getTranslations>>,
  lng: Locale,
  slug: string,
  path: string,
  pageType: PageType = 'public',
) => {
  const isPublic = pageType === 'public';
  const baseUrl = 'https://greenbus.com.ua';

  const safeT = (key: string, fallback = '') => {
    try {
      if (t.has(key)) {
        return t(key);
      }
      return fallback;
    } catch {
      return fallback;
    }
  };

  const title = safeT(`${slug}.title`, 'GreenBus');
  const description = safeT(`${slug}.description`, '');
  const keywords = safeT(`${slug}.keywords`, '');

  // ✅ Функция для нормализации URL с trailing slash
  const normalizeUrl = (urlPath: string): string => {
    // Убираем начальный и конечный слеши
    let cleanPath = urlPath.replace(/^\/+|\/+$/g, '');

    // Если путь не пустой, добавляем слеш в начало
    if (cleanPath) {
      cleanPath = `/${cleanPath}`;
    }

    // Добавляем trailing slash в конце для консистентности
    // НО не добавляем для путей с расширением файла
    if (!cleanPath.match(/\.[a-z]+$/i)) {
      cleanPath = cleanPath ? `${cleanPath}/` : '/';
    }

    return cleanPath;
  };

  const getLocalizedPath = (locale: Locale, urlPath: string): string => {
    const normalizedPath = normalizeUrl(urlPath);

    // Для главной страницы
    if (normalizedPath === '/') {
      return `/${locale}/`;
    }

    // Для остальных страниц
    return `/${locale}${normalizedPath}`;
  };

  const getOgLocale = (lng: Locale): string => {
    const localeMap: Record<Locale, string> = {
      uk: 'uk_UA',
      ru: 'ru_RU',
      en: 'en_US',
    };
    return localeMap[lng] || 'uk_UA';
  };

  const fullPath = getLocalizedPath(lng, path);
  const normalizedPath = normalizeUrl(path);

  return {
    title: title,
    description: description,
    keywords,
    appleWebApp: {
      title: 'GreenBus',
      capable: true,
      statusBarStyle: 'default' as const,
    },
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
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      // Вказуємо реально наявний файл (apple-touch-icon-*.png у public немає).
      apple: [{ url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' }],
    },

    metadataBase: new URL('https://greenbus.com.ua'),
    ...(isPublic && {
      alternates: {
        // ✅ Canonical с trailing slash
        canonical: `${baseUrl}${fullPath}`,
        languages: {
          'x-default': `${baseUrl}/uk${normalizedPath}`,
          uk: `${baseUrl}/uk${normalizedPath}`,
          ru: `${baseUrl}/ru${normalizedPath}`,
          en: `${baseUrl}/en${normalizedPath}`,
        },
      },
    }),
    ...(isPublic && {
      openGraph: {
        title: title,
        description: description,
        url: `${baseUrl}${fullPath}`,
        siteName: 'GreenBus',
        // og:image не задаємо вручну — Next підставить динамічний opengraph-image.tsx.
        locale: getOgLocale(lng),
        type: 'website' as const,
      },
    }),
    ...(isPublic && {
      twitter: {
        card: 'summary_large_image' as const,
        title,
        description,
        // twitter:image успадковується від opengraph-image.tsx.
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
  overrides?: Partial<Metadata>;
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
