'use client';

import { Button } from '../ui/button';
import { ChevronLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { MESSAGE_FILES } from '@/constans/message.file.constans';

export default function BackRouteButton() {
  const t = useTranslations(MESSAGE_FILES.COMMON);

  const route = useRouter();

  const handleGoBack = () => {
    route.back();
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <Button
      variant={'link'}
      onClick={handleGoBack}
      className="gap-0.2 text-slate-700 dark:text-slate-50 text-base font-bold leading-6 tracking-normal"
    >
      <ChevronLeft size={24} />
      {t('backBtn')}
    </Button>
  );
}
