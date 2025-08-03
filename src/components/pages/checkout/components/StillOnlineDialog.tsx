'use client';
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { useTranslations } from 'next-intl';

export function StillOnlineDialog() {
  const t = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);

  return (
    <>
      <DialogHeader>
        <DialogTitle className="tablet:text-2xl text-slate-700 dark:text-slate-50">
          {t('still_online_title')}
        </DialogTitle>
        <DialogDescription className="text-base tablet:text-lg text-slate-700 dark:text-slate-200">
          {t('still_online_description')}
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button size={'secondary'} variant="default">
          OK
        </Button>
      </DialogFooter>
    </>
  );
}
