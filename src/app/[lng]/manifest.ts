import { MetadataRoute } from 'next';
import { getTranslations } from 'next-intl/server';
import { Params } from '@/shared/types/common.types';
import { Locale } from 'next-intl';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';

type Props = {
  params: Params;
};
export default async function manifest({ params }: Props): Promise<MetadataRoute.Manifest> {
  const { lng } = (await params) as { lng: Locale };

  const t = await getTranslations({
    locale: lng,
    namespace: MESSAGE_FILES.COMMON,
  });

  return {
    name: t('manifest.name'),
    start_url: `/${lng}`,
    theme_color: 'light',
  };
}
