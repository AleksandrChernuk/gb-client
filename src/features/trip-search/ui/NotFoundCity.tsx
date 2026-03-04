import { IconSearchX } from '@/assets/icons/IconSearchX';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { useTranslations } from 'next-intl';

export const NotFoundCity = () => {
  const t = useTranslations(MESSAGE_FILES.COMMON);

  return (
    <div className="flex flex-col items-center justify-center gap-1 py-4">
      <IconSearchX />
      <p className="text-base font-bold leading-6 text-slate-700 dark:text-slate-50">{t('notFound')}</p>
      <p className="text-sm leading-4 text-center text-slate-400 dark:text-slate-200">{t('checkName')}</p>
    </div>
  );
};
