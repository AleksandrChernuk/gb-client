import { CustomCard } from '@/components/shared/CustomCard';
import { ReactNode } from 'react';
import StepNumber from './StepNumber';

type Props = {
  children: ReactNode;
  title: string;
  cardCount?: number;
};

export default function CheckoutCard({ children, title, cardCount }: Props) {
  return (
    <ul className="space-y-4">
      <li className="flex items-center gap-2">
        {cardCount && <StepNumber step={cardCount} />}
        <h3 className="text-base font-bold leading-6 tracking-normal tablet:text-2xl tablet:font-medium tablet:leading-[28.8px] text-slate-700 dark:text-slate-50">
          {title}
        </h3>
      </li>
      <li>
        <CustomCard className="space-y-4 dark:bg-slate-800">{children}</CustomCard>
      </li>
    </ul>
  );
}
