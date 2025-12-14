import { MetadataRoute } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/shared/i18n/routing';
import { Locale } from 'next-intl';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const lng = routing.defaultLocale as Locale;

  const t = await getTranslations({
    locale: lng,
    namespace: MESSAGE_FILES.COMMON,
  });

  return {
    name: t('manifest.name'),
    short_name: t('manifest.short_name'),
    description: t('manifest.description'),
    start_url: `/${lng}`,
    scope: `/${lng}`,
    display: 'standalone',
    orientation: 'portrait-primary',
    theme_color: '#018f37',
    background_color: '#ffffff',
    lang: lng,
    dir: getTextDirection(lng),
    categories: ['travel', 'transportation', 'business'],
    icons: [
      {
        src: '/apple-touch-icon-180x180.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/apple-touch-icon-152x152.png',
        sizes: '152x152',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/apple-touch-icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/apple-touch-icon-120x120.png',
        sizes: '120x120',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    shortcuts: [
      {
        name: t('manifest.shortcuts.search.name'),
        short_name: t('manifest.shortcuts.search.short_name'),
        description: t('manifest.shortcuts.search.description'),
        url: `/${lng}/buses`,
        icons: [
          {
            src: '/apple-touch-icon-120x120.png',
            sizes: '120x120',
          },
        ],
      },
      {
        name: t('manifest.shortcuts.orders.name'),
        short_name: t('manifest.shortcuts.orders.short_name'),
        description: t('manifest.shortcuts.orders.description'),
        url: `/${lng}/orders`,
        icons: [
          {
            src: '/apple-touch-icon-120x120.png',
            sizes: '120x120',
          },
        ],
      },
    ],
  };
}

function getTextDirection(locale: Locale): 'ltr' | 'rtl' {
  const rtlLocales = ['ar', 'he', 'fa', 'ur'];
  return rtlLocales.includes(locale) ? 'rtl' : 'ltr';
}
