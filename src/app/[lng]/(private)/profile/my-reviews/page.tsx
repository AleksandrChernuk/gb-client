export const dynamic = 'force-dynamic';
export const revalidate = 0;

import ReviewsList from '@/entities/profile/ReviewsList';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Locale } from '@/shared/i18n/locales';
import { generatePrivatePageMetadata } from '@/shared/lib/metadata';
import { Params } from '@/shared/types/common.types';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Params;
};

export async function generateMetadata({ params }: Props) {
  const { lng } = (await params) as { lng: Locale };
  return await generatePrivatePageMetadata({
    lng,
    namespace: MESSAGE_FILES.METADATA,
    slug: 'profile',
    path: '/profile/my-reviews',
  });
}

const Reviews = async () => {
  const t = await getTranslations(MESSAGE_FILES.PROFILE);

  return (
    <>
      <h1 className="mb-4">{t('reviews')}</h1>

      <ReviewsList />
    </>
  );
};

export default Reviews;
