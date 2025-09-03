import { MESSAGE_FILES } from '@/config/message.file.constans';
import { getTranslations } from 'next-intl/server';
import ReviewsList from './componets/ReviewsList';
import LogOutBtn from '../settings/components/LogOutBtn';

export default async function ReviewsPage() {
  const t = await getTranslations(MESSAGE_FILES.PROFILE);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="mb-4">{t('reviews')}</h1>
        <LogOutBtn />
      </div>

      <ReviewsList />
    </div>
  );
}
