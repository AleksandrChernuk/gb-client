'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from '@/i18n/routing';
import CustomDialog from '@/components/shared/CustomDialog';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/constans/message.file.constans';

export default function Timer() {
  const [open, setOpen] = useState(false);
  const t = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOpen(true);
    }, 600 * 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <CustomDialog
      isOpen={open}
      title={t('still_online_title')}
      description={t('still_online_description')}
      footer={
        <Button size={'secondary'} variant="default" onClick={() => router.back()}>
          {t('still_online_back')}
        </Button>
      }
    />
  );
}
