'use client';

import { IconSearchX } from '@/assets/icons/IconSearchX';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { useTranslations } from 'next-intl';

export const NotFoundCity = () => {
  const t = useTranslations(MESSAGE_FILES.COMMON);

  return (
    <div className="flex flex-col items-center justify-center gap-1 py-4">
      <IconSearchX />
      <div className="text-base font-bold leading-6 tracking-normal text-slate-700 dark:text-slate-50">
        {t('notFound')}
      </div>
      <div className="text-sm font-normal leading-4 tracking-normal text-center text-slate-400 dark:text-slate-200">
        {t('checkName')}
      </div>
    </div>
  );
};
