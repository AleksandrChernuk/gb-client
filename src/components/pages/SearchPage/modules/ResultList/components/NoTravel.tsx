'use client';

import Image from 'next/image';
import noTravelImg from '../../../images/NoTravel.png';
import { CustomCard } from '@/components/shared/CustomCard';
import { useTranslations } from "next-intl";
 
export const NoTravel = () => {
  const t = useTranslations("common");

  return (
    <CustomCard className='mx-auto flex flex-col items-center self-center gap-8 p-5 text-center w-fit shadow-[0_4px_10px_0_rgba(0,0,0,0.2)]'>
      <Image
        src={noTravelImg}
        placeholder='blur'
        alt='peaple wait buses'
        className='overflow-hidden rounded-3xl mx-auto w-auto h-auto tablet:w-[330px] tablet:h-[325px] laptop:w-[350px] laptop:h-[345px]'
      />{' '}
      <h3 className='h3 text-text_prymery_color '>{t('no_travel_dates')}!</h3>
    </CustomCard>
  );
};
