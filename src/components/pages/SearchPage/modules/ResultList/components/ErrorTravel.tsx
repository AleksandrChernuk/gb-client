'use client';

import Image from 'next/image';
import errorImg from '../../../../../../../public/images/error.webp';
import { CustomCard } from '@/components/shared/CustomCard';
import { useTranslation } from 'react-i18next';

export const ErrorTravel = () => {
  const { t } = useTranslation();

  return (
    <CustomCard className='mx-auto flex flex-col items-center self-center gap-8 p-5 text-center w-fit shadow-[0_4px_10px_0_rgba(0,0,0,0.2)]'>
      <Image
        src={errorImg}
        placeholder='blur'
        alt='errorImg'
        className='overflow-hidden rounded-3xl mx-auto w-auto h-auto tablet:w-[330px] tablet:h-[325px] laptop:w-[350px] laptop:h-[345px]'
      />{' '}
      <h3 className='h3 text-text_prymery_color '>{t('something_happend')}!</h3>
    </CustomCard>
  );
};
