import { TPaidBaggage } from '@/shared/types/paid.baggage.types';
import { IBaggagePrice } from '@/shared/types/route.types';
import { useState, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

type TuseBaggag = {
  index: number;
  baggage?: IBaggagePrice[] | null;
};

export const useBaggag = ({ index, baggage }: TuseBaggag) => {
  const [localCounts, setLocalCounts] = useState<Record<string, number>>({});

  const { control, setValue } = useFormContext();

  // безопасно достаём текущие данные багажа
  const selectedPaidBaggage: TPaidBaggage[] =
    useWatch({
      control,
      name: `passengers.${index}.paidBaggage`,
      exact: true,
    }) ?? [];

  // 🔒 защита от некорректных данных
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const safeBaggage: IBaggagePrice[] = Array.isArray(baggage)
    ? baggage.filter(
        (b): b is IBaggagePrice => !!b && typeof b.baggageId === 'string' && typeof b.maxPerPerson !== 'undefined',
      )
    : [];

  const updateBackend = (baggageId: string, count: number, baggageItem: TPaidBaggage) => {
    if (!baggageId || !baggageItem) return; // защита

    let updated: TPaidBaggage[] = Array.isArray(selectedPaidBaggage)
      ? selectedPaidBaggage.filter((b) => b?.baggageId !== baggageId)
      : [];

    if (count > 0) {
      updated = [...updated, ...Array.from({ length: count }, () => ({ ...baggageItem }))];
    }

    try {
      setValue(`passengers.${index}.paidBaggage`, updated, {
        shouldDirty: true,
        shouldValidate: false,
      });
    } catch (e) {
      console.error('❌ setValue failed in useBaggag:', e);
    }
  };

  const handleAdd = (item: IBaggagePrice) => {
    if (!item?.baggageId) return;
    const max = Number(item.maxPerPerson ?? 0);
    const current = localCounts[item.baggageId] ?? 0;
    if (current < max) {
      const newCount = current + 1;
      setLocalCounts((prev) => ({ ...prev, [item.baggageId]: newCount }));
      updateBackend(item.baggageId, newCount, item);
    }
  };

  const handleRemove = (item: TPaidBaggage) => {
    if (!item?.baggageId) return;
    const current = localCounts[item.baggageId] ?? 0;
    if (current > 0) {
      const newCount = current - 1;
      setLocalCounts((prev) => ({ ...prev, [item.baggageId]: newCount }));
      updateBackend(item.baggageId, newCount, item);
    }
  };

  // безопасная группировка багажа
  const grouped = useMemo(() => {
    const acc: Record<string, IBaggagePrice[]> = {};
    if (!safeBaggage.length) return acc;

    for (const item of safeBaggage) {
      const type = item.baggageType || 'unknown';
      if (!acc[type]) acc[type] = [];
      acc[type].push(item);
    }
    return acc;
  }, [safeBaggage]);

  return { grouped, handleRemove, handleAdd, localCounts };
};
