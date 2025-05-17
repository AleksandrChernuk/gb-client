import { ReactElement, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  selectButton: ReactElement;
};

export default function TickedCard({ children, selectButton }: Props) {
  return (
    <div className="relative shadow-xs tablet:shadow-none rounded-t-2xl tablet:rounded-none">
      <div className="p-4 bg-white shadow-none tablet:p-4 dark:bg-slate-900 rounded-t-2xl tablet:rounded-2xl tablet:shadow-xs">
        {children}
      </div>

      <div className="tablet:hidden">{selectButton}</div>
    </div>
  );
}
