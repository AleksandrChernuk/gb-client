'use client';

import { createOrder } from '@/actions/orders.actions';
import { useCurrentTicket } from '@/store/useCurrentTicket';
import { useSearchStore } from '@/store/useSearch';
import { useUserStore } from '@/store/useUser';
import { useShallow } from 'zustand/react/shallow';
import normalizeData from '../helpers/normalizeData';
import { useLocale } from 'next-intl';
import { toast } from 'sonner';
import { useFormContext } from 'react-hook-form';
import { useOrderResult } from '@/store/useOrderResult';

export default function useCreateOrder() {
  const locale = useLocale();
  const { getValues } = useFormContext();

  const from = useSearchStore(useShallow((state) => state.from?.id));
  const to = useSearchStore(useShallow((state) => state.to?.id));
  const ticket = useCurrentTicket(useShallow((state) => state.selectedTicket));
  const user = useUserStore(useShallow((state) => state.currentUser));
  const setInitiatePayment = useOrderResult((state) => state.setInitiatePayment);
  const initiatePayment = useOrderResult((state) => state.initiatePayment);
  const setLoadingResult = useOrderResult((state) => state.setLoadingResult);

  const createNewOrder = async () => {
    if (!ticket || !from || !to) {
      toast.error('no data');
      return;
    }

    if (initiatePayment?.orderId) {
      setInitiatePayment(null);
      //отмена ордера
    }

    const formData = getValues();

    try {
      setLoadingResult(true);
      const res = await createOrder(
        normalizeData({
          from_city_id: from,
          to_city_id: to,
          locale,
          formData,
          route: ticket,
          user,
        }),
      );

      if (res.status === 'error') {
        toast.error('error');
        setLoadingResult(false);
        return;
      }

      setInitiatePayment(res);
      toast.success('success');
    } catch (error) {
      console.log(error);
      toast.error('error');
      setLoadingResult(false);
    } finally {
      setLoadingResult(false);
    }
  };

  return { createNewOrder };
}
