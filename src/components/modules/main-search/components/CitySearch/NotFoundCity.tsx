'use client'

import { IconSearchX } from "@/components/icons/IconSearchX";
import { useTranslation } from "react-i18next";

export const NotFoundCity = () => {
      const { t } = useTranslation(['common']);
  
  return (
    <div className='flex flex-col items-center justify-center gap-1 tablet:min-w-[397px] py-4'>
      <IconSearchX />
      <div className='h5 text-text_prymery_color'>{t('notFound')}</div>
      <div className='text-center addional_regular_text text-text_secondary_color'>
        {t('checkName')}
      </div>
    </div>
  );
};
