import { useState } from 'react';

import { useFormContext, useWatch } from 'react-hook-form';
import { TPaidBaggage } from '@/shared/types/paid.baggage.types';
import { IBaggagePrice } from '@/shared/types/route.types';
import { BaggagePay } from '@/assets/icons/baggagePay';
import { BaggageFree } from '@/assets/icons/baggageFree';
import { Minus, Plus } from 'lucide-react';

type Props = {
  i: number;
  baggage: IBaggagePrice[];
};

export default function Baggage({ baggage, i }: Props) {
  const { control, setValue } = useFormContext();

  const selectedPaidBaggage: IBaggagePrice[] =
    useWatch({ control, name: `passengers.${i}.paidBaggage`, exact: true }) ?? [];
  const [localCounts, setLocalCounts] = useState<Record<string, number>>({});
  console.log(baggage);
  if (!baggage) return null;

  const updateBackend = (baggageId: string, count: number, baggageItem: TPaidBaggage) => {
    let updated: TPaidBaggage[] = selectedPaidBaggage.filter((b) => b.baggageId !== baggageId);

    if (count > 0) {
      updated = [
        ...updated,
        ...Array(count).fill({
          ...baggageItem,
        }),
      ];
    }

    setValue(`passengers.${i}.paidBaggage`, updated, { shouldDirty: true, shouldValidate: false });
  };

  const handleAdd = (item: IBaggagePrice) => {
    const current = localCounts[item.baggageId] ?? 0;
    if (current < Number(item.maxPerPerson)) {
      const newCount = current + 1;
      setLocalCounts((prev) => ({ ...prev, [item.baggageId]: newCount }));
      updateBackend(item.baggageId, newCount, item);
    }
  };

  const handleRemove = (item: TPaidBaggage) => {
    const current = localCounts[item.baggageId] ?? 0;
    if (current > 0) {
      const newCount = current - 1;
      setLocalCounts((prev) => ({ ...prev, [item.baggageId]: newCount }));
      updateBackend(item.baggageId, newCount, item);
    }
  };

  const grouped = baggage.reduce(
    (acc, item) => {
      acc[item.baggageType] = acc[item.baggageType] || [];
      acc[item.baggageType].push(item);
      return acc;
    },
    {} as Record<string, IBaggagePrice[]>,
  );

  return (
    <div className="flex flex-col gap-4">
      {Object.entries(grouped).map(([type, items]) => (
        <div key={type} className="flex flex-col gap-4 ">
          {items.map((el) => {
            const count = localCounts[el.baggageId] ?? 0;

            return (
              <div
                key={el.baggageId}
                className="flex items-center gap-2 justify-between  bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl shadow-sm"
              >
                <div className="flex items-center gap-2">
                  {el.price === 0 ? <BaggageFree /> : <BaggagePay />}
                  <div className="flex flex-col">
                    <div className="text-[10px] sm:text-xs text-gray-500 dark:text-slate-50">
                      Розмір до {el.length}x{el.width}x{el.height} (см), {el.kg} кг
                    </div>
                    <div className="text-xs sm:text-base font-medium dark:text-slate-50">{el.baggageTitle}</div>
                    {el.price === 0 && <div className="text-xs sm:text-sm text-green-300">Безкоштовно</div>}
                    {el.price !== 0 && (
                      <div className="text-xs sm:text-sm text-green-300">Докупити ще місце для багажу</div>
                    )}
                  </div>
                </div>
                {el.price > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium dark:text-slate-50">
                      {count > 0 && `${count * el.price} ${el.currency}`}
                    </div>

                    <div className="bg-white flex gap-2 items-center justify-between p-1 w-24 dark:bg-slate-900 dark:hover:bg-black border-[1px] border-[#6f8b90] dark:border-[#6f8b90] rounded-md transition-all">
                      <button type="button" className="p-1" onClick={() => handleRemove(el)}>
                        <Minus size={16} className="stroke-slate-700 dark:stroke-slate-200" />
                      </button>

                      <p className="text-base font-bold leading-6 tracking-normal text-center text-black dark:text-slate-50 grow">
                        {count}
                      </p>

                      <button type="button" className="p-1" onClick={() => handleAdd(el)}>
                        <Plus size={16} className="stroke-slate-700 dark:stroke-slate-200" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
