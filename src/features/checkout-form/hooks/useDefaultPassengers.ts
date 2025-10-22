import { getProviderConfigByName } from '@/features/checkout-form/config/getProviderConfigByName';
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

  const adult = selectedTicket?.adult ?? 0;
  const children = selectedTicket?.children ?? 0;
  const ticket = selectedTicket?.route;

  const defaultPassengers = useMemo(() => {
    if (!providerConfig || !ticket) return [];

    const passengers = createPassengers(adult, children, providerConfig, ticket.ticketPricing.basePrice || 0);

    if (!Array.isArray(passengers)) {
      console.error('createPassengers did not return an array');
      return [];
    }

    if (!!ticket?.details && !!ticket?.details.baggagePrice && ticket.details.baggagePrice.length > 0) {
      return passengers.map((el) => ({ ...el, paidBaggage: [] }));
    }

    return passengers as PassengerFormData[];
  }, [adult, children, providerConfig, ticket]);
  return { defaultPassengers };
}
