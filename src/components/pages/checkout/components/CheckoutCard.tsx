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
        <h3 className="h4 text-text_prymery">{title}</h3>
      </li>
      <li>
        <CustomCard className="space-y-4 dark:bg-dark_main">{children}</CustomCard>
      </li>
    </ul>
  );
}
