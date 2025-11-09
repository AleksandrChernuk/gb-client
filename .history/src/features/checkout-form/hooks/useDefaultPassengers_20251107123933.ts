import { getProviderConfigByName } from '@/features/checkout-form/lib/providerFormConfig/getProviderConfigByName';
import { createPassengers } from '@/features/checkout-form/helpers/createPassList';
import { PassengerFormData } from '@/features/checkout-form/types';
import { useSelectedTickets } from '@/shared/store/useSelectedTickets';
import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';

export default function useDefaultPassengers() {
  const selectedTicket = useSelectedTickets(useShallow((state) => state.selectedTicket));

  const providerConfig = useMemo(
    () => (selectedTicket ? getProviderConfigByName(selectedTicket.route) : null),
    [selectedTicket],
  );

  const voyagers = selectedTicket?.voyagers ?? 0;
  const ticket = selectedTicket?.route;

  const defaultPassengers = useMemo(() => {
    if (!providerConfig || !ticket) return [];

    const passengers = createPassengers(voyagers, providerConfig, ticket.ticketPricing.basePrice || 0);

    if (!Array.isArray(passengers)) {
      console.error('createPassengers did not return an array');
      return [];
    }

    if (!!ticket?.details && !!ticket?.details.baggagePrice && ticket.details.baggagePrice.length > 0) {
      return passengers.map((el) => ({ ...el, paidBaggage: [] }));
    }

    return passengers as PassengerFormData[];
  }, [voyagers, providerConfig, ticket]);

  return { defaultPassengers };
}
