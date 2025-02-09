'use client';

import React from 'react';
import { Button } from '../ui/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export default function BackButton() {
  const { t } = useTranslation(['common']);

  const route = useRouter();
  return (
    <Button
      variant={'link'}
      onClick={() => {
        route.back();
      }}
      className='gap-0.2 text-text_prymery_color h5'
    >
      <ChevronLeft size={24} />
      {t('backBtn')}
    </Button>
  );
}
