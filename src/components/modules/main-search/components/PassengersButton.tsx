'use client';

import { MESSAGE_FILES } from '@/config/message.file.constans';
import { Minus, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

type Props = {
  type: 'adult' | 'children';
  value: number;
  handleIcrement: () => void;
  handleDecrement: () => void;
};

export const PassengersButton = ({ value, type, handleIcrement, handleDecrement }: Props) => {
  const t = useTranslations(MESSAGE_FILES.COMMON);

  const isAdult = type === 'adult';
  const maxValue = 10;
  const minValue = isAdult ? 1 : 0;

  return (
    <div className={`flex flex-row items-center justify-between gap-20 ${isAdult && 'border-px border-[#e6e6e6]'}`}>
      <p className="text-sm font-normal leading-4 tracking-normal text-slate-700 dark:text-slate-50 text-nowrap">
        {isAdult ? t('adult') : t('children')}
      </p>

      <div className="bg-white flex gap-2 items-center justify-between p-1 w-24 dark:bg-slate-900 dark:hover:bg-black border-[1px] border-[#6f8b90] dark:border-[#6f8b90] rounded-md transition-all">
        <button
          className="p-1"
          onClick={() => {
            if (value === minValue) {
              return;
            }
            handleDecrement();
          }}
          aria-label={`Decrement ${isAdult ? 'adult' : 'children'}`}
        >
          <Minus size={16} className="stroke-slate-700 dark:stroke-slate-200" />
        </button>

        <p className="text-base font-bold leading-6 tracking-normal text-center text-black dark:text-slate-50 grow">
          {value}
        </p>

        <button
          className="p-1"
          onClick={() => {
            if (value === maxValue) {
              return;
            }
            handleIcrement();
          }}
          aria-label={`Increment ${isAdult ? 'adult' : 'children'}`}
        >
          <Plus size={16} className="stroke-slate-700 dark:stroke-slate-200" />
        </button>
      </div>
    </div>
  );
};
