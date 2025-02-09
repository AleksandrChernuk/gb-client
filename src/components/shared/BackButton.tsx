'use client';

import React from 'react';
import { Button } from '../ui/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from "next-intl";
 
export default function BackButton() {
  const t = useTranslations("common");

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
