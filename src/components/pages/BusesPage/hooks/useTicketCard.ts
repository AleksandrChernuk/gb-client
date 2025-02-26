import { useSearchStore } from '@/store/useSearch';
import { IRouteResponse } from '@/types/route.types';
import { useLocale } from 'next-intl';
import { useCurrentTicketStore } from '@/store/useCurrentTicket';
import { useShallow } from 'zustand/react/shallow';
import { useRouter } from '@/i18n/routing';
import { setCookie } from '@/actions/cookie-actions';

export default function useTicketCard() {
  const getDetailsTicket = useCurrentTicketStore((state) => state.getDetailsTicket);
  const setSelectedTicket = useCurrentTicketStore((state) => state.setSelectedTicket);

  const from = useSearchStore(useShallow((state) => state.from));
  const to = useSearchStore(useShallow((state) => state.to));
  const adult = useSearchStore(useShallow((state) => state.adult));
  const children = useSearchStore(useShallow((state) => state.children));
  const date = useSearchStore(useShallow((state) => state.date));

  const currentLocale = useLocale();
  const router = useRouter();

  const handleSetTicket = async (element: IRouteResponse) => {
    await setCookie({
      name: '_p',
      value: JSON.stringify({ adult, children }),
    });

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
  };
}
