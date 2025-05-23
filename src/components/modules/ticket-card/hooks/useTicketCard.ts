'use client';

import { useSearchStore } from '@/store/useSearch';
import { IRouteResponse } from '@/types/route.types';
import { useLocale } from 'next-intl';
import { useCurrentTicket } from '@/store/useCurrentTicket';
import { useShallow } from 'zustand/react/shallow';
import { useRouter } from '@/i18n/routing';

export default function useTicketCard() {
  const getDetailsTicket = useCurrentTicket((state) => state.getDetailsTicket);
  const setSelectedTicket = useCurrentTicket(useShallow((state) => state.setSelectedTicket));
  const setSelectedTicketId = useCurrentTicket(useShallow((state) => state.setSelectedTicketId));

  const [from, to, adult, children, date] = useSearchStore(
    useShallow((state) => [state.from, state.to, state.adult, state.children, state.date]),
  );

  const currentLocale = useLocale();
  const router = useRouter();

  const handleSetTicket = async (id: string, element: IRouteResponse) => {
    setSelectedTicketId(id);
    if (!element) return;

    const ticketFromStore = useCurrentTicket.getState().tickets[id];
    const hasDetails = ticketFromStore?.details;

    await setSelectedTicket({
      route: element,
      toCityId: to?.id,
      fromCityId: from?.id,
      locale: currentLocale,
      passCount: adult + children,
      travelDate: date,
    });

    if (!hasDetails) {
      await getDetailsTicket({
        route: element,
        toCityId: to?.id,
        fromCityId: from?.id,
        locale: currentLocale,
        passCount: adult + children,
        travelDate: date,
      });
    }

    router.push('/checkout', { scroll: true });
  };

  const handleGetDetails = (element: IRouteResponse) => {
    if (element) {
      getDetailsTicket({
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
