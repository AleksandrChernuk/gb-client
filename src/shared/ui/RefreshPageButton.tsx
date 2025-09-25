'use client';

import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { useRouter } from '@/shared/i18n/routing';
import { Button } from '@/shared/ui/button';
import { RefreshCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const RefreshPageButton = () => {
  const router = useRouter();
  const t = useTranslations(MESSAGE_FILES.PAYMENT_RESULT_PAGE);

  return (
    <Button variant="outline" size="primary" onClick={() => router.refresh()} className="text-slate-800">
      {t('refresh')} <RefreshCcw />
    </Button>
  );
};
