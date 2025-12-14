import { MetadataRoute } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/shared/i18n/routing';
// import { Locale } from 'next-intl';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const t = await getTranslations({
    locale: routing.defaultLocale,
    namespace: MESSAGE_FILES.COMMON,
  });

  return {
    name: t('manifest.name'),
    short_name: t('manifest.short_name'),
    description: t('manifest.description'),
    start_url: `/`,
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#018f37',
    // scope: `/${lng}`,
    // display: 'standalone',
    // orientation: 'portrait-primary',
    // theme_color: '#018f37',
    // background_color: '#ffffff',
    // lang: lng,
    //   categories: ['travel', 'transportation', 'business'],
    icons: [
      {
        src: 'icons/icon-48x48.png',
        sizes: '48x48',
        type: 'image/png',
      },
      {
        src: 'icons/icon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
      },
      {
        src: 'icons/icon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: 'icons/icon-128x128.png',
        sizes: '128x128',
        type: 'image/png',
      },
      {
        src: 'icons/icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
      },
      {
        src: 'icons/icon-152x152.png',
        sizes: '152x152',
        type: 'image/png',
      },
      {
        src: 'icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'icons/icon-256x256.png',
        sizes: '256x256',
        type: 'image/png',
      },
      {
        src: 'icons/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
      },
      {
        src: 'icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
