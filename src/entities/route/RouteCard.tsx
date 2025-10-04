import { PAYMENT_TYPES } from '@/shared/constans/payment.methods.constans';
import { Badge } from '@/shared/ui/badge';
import { ReactElement, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  selectButton: ReactElement;
  providerName: string;
  canPaymentToDriver?: boolean;
};

export default function RouteCardWrapper({ children, selectButton, providerName, canPaymentToDriver }: Props) {
  return (
    <div className="relative shadow-xs tablet:shadow-none rounded-t-2xl tablet:rounded-none">
      <div className="p-4 bg-white shadow-none tablet:p-4 dark:bg-slate-900 rounded-t-2xl tablet:rounded-2xl tablet:shadow-xs">
        <div className="flex items-center gap-2 justify-end">
          <div className="flex items-center gap-2 justify-end mb-1">
            <div className="size-6">{PAYMENT_TYPES[1].ICON}</div>
            {canPaymentToDriver && providerName !== 'KLR' && <div className="size-6">{PAYMENT_TYPES[0].ICON}</div>}
          </div>
          <Badge variant="secondary" className="bg-blue-500 text-white dark:bg-blue-600">
            {providerName || ''}
          </Badge>
        </div>

        {children}
      </div>

      <div className="tablet:hidden">{selectButton}</div>
    </div>
  );
}
