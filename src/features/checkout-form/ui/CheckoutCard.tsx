import { ReactNode } from 'react';
import CustomCard from '@/shared/ui/CustomCard';

type Props = {
  children: ReactNode;
  title: string;
  cardCount?: number;
  needCard?: boolean;
};

export default function CheckoutCard({ children, title, cardCount, needCard }: Props) {
  return (
    <ul className="space-y-4 ">
      <li className="flex items-center gap-2">
        {cardCount && (
          <div className="w-6 h-6 text-base font-bold text-center text-white rounded-sm bg-primary">{cardCount}</div>
        )}
        <h3 className="text-lg font-bold leading-6 tracking-normal tablet:text-2xl tablet:font-medium tablet:leading-[28.8px] text-slate-700 dark:text-slate-50">
          {title}
        </h3>
      </li>
      <li>
        {!needCard && <CustomCard className="p-3 tablet:p-4 dark:bg-slate-800 shadow-sm">{children}</CustomCard>}
        {needCard && <>{children}</>}
      </li>
    </ul>
  );
}
