import { PAYMENT_TYPES } from '@/shared/constans/payment.methods.constans';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip';
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
      <div className="p-4 bg-white tablet:p-4 dark:bg-slate-900 rounded-t-2xl tablet:rounded-2xl shadow-sm">
        <div className="flex items-center gap-2 justify-end">
          <div className="flex items-center gap-2 justify-end mb-1">
            <Tooltip>
              <TooltipTrigger>
                <div className="size-6">{PAYMENT_TYPES[0].ICON}</div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Оплата картою</p>
              </TooltipContent>
            </Tooltip>

            {canPaymentToDriver && providerName !== 'KLR' && (
              <div className="size-6">
                <Tooltip>
                  <TooltipTrigger>
                    <div className="size-6">{PAYMENT_TYPES[1].ICON}</div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Оплата водієві</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            )}
          </div>
        </div>

        {children}
      </div>

      <div className="tablet:hidden">{selectButton}</div>
    </div>
  );
}
