'use client';

import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Minus, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

type Props = {
  value: number;
  handleIcrement: () => void;
  handleDecrement: () => void;
};

export const PassengersButton = ({ value, handleIcrement, handleDecrement }: Props) => {
  const t = useTranslations(MESSAGE_FILES.COMMON);

  const maxValue = 10;

  return (
    <div className={`flex flex-row items-center justify-between gap-20`}>
      <p className="text-lg leading-4 tracking-normal text-slate-700 dark:text-slate-50 text-nowrap font-medium">
        {t('placeholderPassengers')}
      </p>

      <div className="bg-white flex gap-2 items-center justify-between p-1 w-24 dark:bg-slate-900 dark:hover:bg-black border-[1px] border-[#6f8b90] dark:border-[#6f8b90] rounded-md transition-all">
        <button
          className="p-1"
          onClick={() => {
            if (value === 1) {
              return;
            }
            handleDecrement();
          }}
          aria-label={`Decrement  Passengers`}
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
          aria-label={`Increment  Passengers'}`}
        >
          <Plus size={16} className="stroke-slate-700 dark:stroke-slate-200" />
        </button>
      </div>
    </div>
  );
};
