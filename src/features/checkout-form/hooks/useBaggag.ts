import { TPaidBaggage } from '@/shared/types/paid.baggage.types';
import { IBaggagePrice } from '@/shared/types/route.types';
import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

type TuseBaggag = {
  index: number;
  baggage: IBaggagePrice[];
};

export const useBaggag = ({ index, baggage }: TuseBaggag) => {
  const [localCounts, setLocalCounts] = useState<Record<string, number>>({});

  const { control, setValue } = useFormContext();

  const selectedPaidBaggage: IBaggagePrice[] =
    useWatch({ control, name: `passengers.${index}.paidBaggage`, exact: true }) ?? [];

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

    setValue(`passengers.${index}.paidBaggage`, updated, { shouldDirty: true, shouldValidate: false });
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

  return { grouped, handleRemove, handleAdd, localCounts };
};
