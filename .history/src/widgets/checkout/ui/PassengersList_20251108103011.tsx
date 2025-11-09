'use client';

import { useFieldArray, useFormContext } from 'react-hook-form';
import { useMemo } from 'react';
import { useSelectedTickets } from '@/shared/store/useSelectedTickets';
import PassengerCard from '@/features/checkout-form/ui/PassengerCard';
import { useShallow } from 'zustand/react/shallow';
import { getProviderConfigByName } from '@/features/checkout-form/lib/providerFormConfig/getProviderConfigByName';

export default function PassengersList() {
  const { control } = useFormContext();
  const { fields } = useFieldArray({ control, name: 'passengers' });

  const { route } = useSelectedTickets(
    useShallow((state) => ({
      route: state.selectedTicket?.route,
    })),
  );
  const providerConfig = useMemo(() => getProviderConfigByName(route ?? null), [route]);

  return (
    <ul className="space-y-6">
      {fields.map((field, i) => (
        <PassengerCard
          index={i}
          key={field.id}
          providerConfig={providerConfig}
          paidBaggage={route?.details?.baggagePrice}
        />
      ))}
    </ul>
  );
}
