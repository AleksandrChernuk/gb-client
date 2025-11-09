'use client';

import { IBaggagePrice } from '@/shared/types/route.types';
import { BaggagePay } from '@/assets/icons/baggagePay';
import { BaggageFree } from '@/assets/icons/baggageFree';
import { BaggageItem } from '@/features/checkout-form/ui/BaggageItem';
import { useBaggag } from '@/features/checkout-form/hooks/useBaggag';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

type Props = {
  index: number;
  baggage?: IBaggagePrice[] | null;
};

export default function Baggage({ baggage, index }: Props) {
  const { grouped, handleRemove, handleAdd, localCounts } = useBaggag({ index, baggage });
  const { register } = useFormContext();

  useEffect(() => {
    register(`passengers.${index}.paidBaggage`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!baggage) return null;

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-base tablet:text-lg text-green-300 font-medium">Багаж</h4>
      {Object.entries(grouped).map(([type, items]) => (
        <div key={type} className="flex flex-col gap-4">
          {items.map((el) => {
            const count = localCounts[el.baggageId] ?? 0;

            if (el.price !== 0) {
              return (
                <BaggageItem
                  key={el.baggageId}
                  icon={el.price === 0 ? <BaggageFree /> : <BaggagePay />}
                  title={el.baggageTitle}
                  description={`Розмір до ${el.length}x${el.width}x${el.height} (см), ${el.kg} кг`}
                  price={el.price}
                  count={count}
                  currency={el.currency}
                  onIncrease={() => handleAdd(el)}
                  onDecrease={() => handleRemove(el)}
                />
              );
            }
          })}
        </div>
      ))}
    </div>
  );
}
