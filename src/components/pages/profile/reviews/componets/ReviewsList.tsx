'use client';

import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { useTranslations } from 'next-intl';

export default function ReviewsList() {
  const t = useTranslations(MESSAGE_FILES.PROFILE);
  return (
    <div className="py-5">
      <h3 className="text-center text-base text-slate-500 dark:text-slate-400">{t('no_reviews')}</h3>
    </div>
  );
}
