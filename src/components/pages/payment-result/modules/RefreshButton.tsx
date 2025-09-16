'use client';

import { Button } from '@/components/ui/button';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { RefreshCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';

export const RefreshButton = () => {
  const router = useRouter();
  const t = useTranslations(MESSAGE_FILES.PAYMENT_RESULT_PAGE);

  return (
    <Button variant="outline" size="primary" onClick={() => router.refresh()} className="text-slate-800">
      {t('refresh')} <RefreshCcw />
    </Button>
  );
};
