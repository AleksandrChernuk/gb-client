'use client';

import { Button } from '../ui/button';
import { ChevronLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { useEffect } from 'react';

export default function BackRouteButton() {
  const t = useTranslations(MESSAGE_FILES.COMMON);

  const router = useRouter();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  const handleGoBack = () => {
    window.scrollTo(0, 0);
    router.back();
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
