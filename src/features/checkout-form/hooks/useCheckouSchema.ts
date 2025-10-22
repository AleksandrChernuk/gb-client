import { getCheckoutSchemaForProvider } from '@/features/checkout-form/config';
import { getProviderConfigByName } from '@/features/checkout-form/config/getProviderConfigByName';
import { useSelectedTickets } from '@/shared/store/useSelectedTickets';
import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';

export default function useCheckouSchema() {
  const { selectedTicket } = useSelectedTickets(
    useShallow((state) => ({
      selectedTicket: state.selectedTicket,
    })),
  );

  const providerConfig = useMemo(
    () => (selectedTicket ? getProviderConfigByName(selectedTicket.route) : null),
    [selectedTicket],
  );

  const schema = useMemo(() => {
    if (!providerConfig) return null;
    return getCheckoutSchemaForProvider(providerConfig, !!selectedTicket?.route?.details?.seatsMap?.length);
  }, [providerConfig, selectedTicket?.route?.details?.seatsMap?.length]);

  return { schema };
}
