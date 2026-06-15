'use client';

import { IBaggagePrice } from '@/shared/types/route.types';
import { BaggagePay } from '@/assets/icons/baggagePay';
import { BaggageFree } from '@/assets/icons/baggageFree';
import { BaggageItem } from '@/features/checkout-form/ui/BaggageItem';
import { useBaggag } from '@/features/checkout-form/hooks/useBaggag';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';

type Props = {
  index: number;
  baggage?: IBaggagePrice[] | null;
};

export default function Baggage({ baggage, index }: Props) {
  const { grouped, handleRemove, handleAdd, counts } = useBaggag({ index, baggage });
  const { register } = useFormContext();
  const t = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);

  useEffect(() => {
    register(`passengers.${index}.paidBaggage`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!baggage) return null;

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-base tablet:text-lg text-green-300 font-medium">{t('baggage_title')}</h4>
      {Object.entries(grouped).map(([type, items]) => (
        <div key={type} className="flex flex-col gap-4">
          {items.map((el) => {
            const isPaid = el.price !== 0;
            const description = t('baggage_description', {
              length: el.length,
              width: el.width,
              height: el.height,
              kg: el.kg,
            });

            // бесплатный багаж — показываем без счётчика
            if (!isPaid) {
              return <BaggageItem key={el.baggageId} icon={<BaggageFree />} title={el.baggageTitle} description={description} />;
            }

            return (
              <BaggageItem
                key={el.baggageId}
                icon={<BaggagePay />}
                title={el.baggageTitle}
                description={description}
                price={el.price}
                count={counts[el.baggageId] ?? 0}
                currency={el.currency}
                onIncrease={() => handleAdd(el)}
                onDecrease={() => handleRemove(el)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
