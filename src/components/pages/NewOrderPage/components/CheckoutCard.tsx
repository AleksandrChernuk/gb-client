import { CustomCard } from '@/components/shared/CustomCard';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  title: string;
  cardCount?: number;
};

export default function CheckoutCard({ children, title, cardCount }: Props) {
  return (
    <ul className='space-y-4'>
      <li className='flex items-center gap-2 mb-4'>
        {cardCount && (
          <div className='w-10 h-10 p-2 font-bold text-center text-white rounded-xl bg-primary'>
            {cardCount}
          </div>
        )}
        <h3 className='h4 text-text_prymery_color'>{title}</h3>
      </li>
      <li>
        <CustomCard className='space-y-4 dark:bg-dark_mode_main1'>{children}</CustomCard>
      </li>
    </ul>
  );
}
