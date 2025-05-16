'use client';

import { useSearchStore } from '@/store/useSearch';
import { IRouteResponse } from '@/types/route.types';
import { useLocale } from 'next-intl';
import { useCurrentTicket } from '@/store/useCurrentTicket';
import { useShallow } from 'zustand/react/shallow';
import { useRouter } from '@/i18n/routing';
import { setCookie } from '@/actions/cookie.actions';
import { useState } from 'react';

export default function useTicketCard() {
  const [loading, setLoading] = useState(false);

  const getDetailsTicket = useCurrentTicket((state) => state.getDetailsTicket);
  const setSelectedTicket = useCurrentTicket(useShallow((state) => state.setSelectedTicket));
  const setSelectedTicketId = useCurrentTicket(useShallow((state) => state.setSelectedTicketId));

  const [from, to, adult, children, date] = useSearchStore(
    useShallow((state) => [state.from, state.to, state.adult, state.children, state.date]),
  );

  const currentLocale = useLocale();
  const router = useRouter();

  const handleSetTicket = async (id: string, element: IRouteResponse) => {
    await setCookie({
      name: '_p',
      value: JSON.stringify({ adult, children }),
    });
    setLoading(true);
    setSelectedTicketId(id);

    if (element) {
      await setSelectedTicket({
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
    loading,
  };
}
