'use client';

import React from 'react';
import { Button } from '../ui/button';
import { ChevronLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';

export default function BackRouteButton() {
  const t = useTranslations('common');

  const route = useRouter();

  const handleGoBack = () => {
    route.back();
  };

  return (
    <Button variant={'link'} onClick={handleGoBack} className="gap-0.2   text-text_prymery h5">
      <ChevronLeft size={24} />
      {t('backBtn')}
    </Button>
  );
}
