import { ReactNode } from 'react';
import { Minus, Plus } from 'lucide-react';

type Props = {
  icon: ReactNode;
  title: string;
  description?: string;
  price?: number;
  count?: number;
  currency?: string;
  onIncrease?: () => void;
  onDecrease?: () => void;
};

export const BaggageItem = ({ icon, title, description, price, count, onIncrease, onDecrease, currency }: Props) => {
  const hasCounter = typeof count === 'number';
  const t = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);

  return (
    <div className="flex  flex-wrap gap-3 items-center  justify-between bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl shadow-sm">
      <div className="flex items-center gap-2">
        <div className="shrink-0">{icon}</div>
        <div className="flex flex-col gap-0.5">
          <div className="text-xs sm:text-base font-medium dark:text-slate-50">{title}</div>
          {price !== undefined && (
            <div className="text-xs sm:text-sm text-green-300">{'Докупити ще місце для багажу'}</div>
          )}
          {description && <div className="text-[10px] sm:text-xs text-gray-500 dark:text-slate-50">{description}</div>}
        </div>
      </div>

      {price !== undefined && (
        <div className=" ml-auto flex items-center gap-2">
          {(count || 0) * price !== 0 && count && (
            <div className="text-sm tablet:tex-lg font-bold dark:text-slate-50  ">
              {count * price}
              <span className="text-green-300 dark:text-green-200 ml-0.5 font-light">{currency?.toLowerCase()}</span>
            </div>
          )}

          {hasCounter && (
            <div className=" bg-white flex gap-2 items-center justify-between p-1 w-24 dark:bg-slate-900 dark:hover:bg-black border-[1px] border-[#6f8b90] rounded-md transition-all">
              <button type="button" className="p-1" onClick={onDecrease}>
                <Minus size={16} className="stroke-slate-700 dark:stroke-slate-200" />
              </button>
              <p className="text-base font-bold text-center text-black dark:text-slate-50 grow">{count}</p>
              <button type="button" className="p-1" onClick={onIncrease}>
                <Plus size={16} className="stroke-slate-700 dark:stroke-slate-200" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
