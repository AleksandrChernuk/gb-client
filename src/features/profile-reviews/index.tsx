import { getTranslations } from 'next-intl/server';
import ReviewsList from '../../entities/profile/ReviewsList';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';

export default async function ReviewsPage() {
  const t = await getTranslations(MESSAGE_FILES.PROFILE);

  return (
    <div>
      <h1 className="mb-4">{t('reviews')}</h1>

      <ReviewsList />
    </div>
  );
}
