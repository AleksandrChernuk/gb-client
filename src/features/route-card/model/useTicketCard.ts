'use client';

import { useSearchStore } from '@/shared/store/useSearch';
import { IRouteResponse } from '@/shared/types/route.types';
import { useLocale } from 'next-intl';
import { useShallow } from 'zustand/react/shallow';
import { useSelectedTickets } from '@/shared/store/useSelectedTickets';
import { useTicketsDetails } from '@/shared/store/useTicketsDetails';
import { useRouter } from '@/shared/i18n/routing';

export default function useTicketCard() {
  const setSelectedTicket = useSelectedTickets(useShallow((state) => state.setSelectedTicket));
  const setTicketsDetails = useTicketsDetails(useShallow((state) => state.setTicketsDetails));

  const [from, to, adult, children, date] = useSearchStore(
    useShallow((state) => [state.from, state.to, state.adult, state.children, state.date]),
  );

  const currentLocale = useLocale();
  const router = useRouter();

  const handleSetTicket = async (id: string, element: IRouteResponse) => {
    if (!element) return;
    await setSelectedTicket({
      route: element,
      toCityId: to?.id,
      fromCityId: from?.id,
      locale: currentLocale,
      passCount: adult + children,
      travelDate: date,
    });

    router.push(`/checkout`, { scroll: true });
  };

  const handleGetDetails = (element: IRouteResponse) => {
    if (element) {
      setTicketsDetails({
        route: element,
        toCityId: to?.id,
        fromCityId: from?.id,
        locale: currentLocale,
        passCount: adult + children,
        travelDate: date,
      });
    }
  };

  return {
    handleGetDetails,
    handleSetTicket,
  };
}
