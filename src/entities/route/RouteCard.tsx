import { ReactElement, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  selectButton: ReactElement;
  providerName: string;
};

export default function RouteCardWrapper({ children, selectButton, providerName }: Props) {
  return (
    <div className="relative shadow-xs tablet:shadow-none rounded-t-2xl tablet:rounded-none">
      <div className="p-4 bg-white shadow-none tablet:p-4 dark:bg-slate-900 rounded-t-2xl tablet:rounded-2xl tablet:shadow-xs">
        <span className="block text-[8px] font-normal tracking-normal leading-[18px] break-all text-slate-700 dark:text-slate-50 text-right">
          {providerName || ''}
        </span>
        {children}
      </div>

      <div className="tablet:hidden">{selectButton}</div>
    </div>
  );
}
