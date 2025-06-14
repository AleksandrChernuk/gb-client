'use client';

import { Button } from '@/components/ui/button';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function TripsList() {
  const t = useTranslations(MESSAGE_FILES.PROFILE);

  return (
    <div className="py-5 text-center">
      <h3 className="mb-4 text-base text-slate-500 dark:text-slate-400">{t('no_trips')}</h3>
      <Button asChild variant={'link'}>
        <Link href={'/buses'}> {t('go_to_search')}</Link>
      </Button>
    </div>
  );
}
