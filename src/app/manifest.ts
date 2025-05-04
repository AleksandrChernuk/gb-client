import { MetadataRoute } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { MESSAGE_FILES } from '@/constans/message.file.constans';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const t = await getTranslations({
    locale: routing.defaultLocale,
    namespace: MESSAGE_FILES.COMMON,
  });

  return {
    name: t('manifest.name'),
    start_url: '/',
    theme_color: '#101E33',
  };
}
