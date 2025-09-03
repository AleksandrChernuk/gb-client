'use client';

import { Button } from '../ui/button';
import { ChevronLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { cn } from '@/lib/utils';

export default function BackRouteButton({ className }: { className?: string }) {
  const t = useTranslations(MESSAGE_FILES.COMMON);

  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Button
      variant={'link'}
      onClick={handleGoBack}
      className={cn(
        'gap-0.2 text-slate-700 dark:text-slate-50 text-base font-bold leading-6 tracking-normal',
        className,
      )}
    >
      <ChevronLeft size={24} />
      {t('backBtn')}
    </Button>
  );
}
