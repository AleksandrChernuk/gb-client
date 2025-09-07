'use client';

import { getUserOrders } from '@/actions/user.services.client';
import { useUserStore } from '@/store/useUser';
import { IUserOrdersResponse } from '@/types/payments.Info.types';
import { useQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import { MainLoader } from '@/components/shared/MainLoader';
import TryAgain from '@/components/shared/TryAgain';
import OrderCart from './components/OrderCart';

const OrdersPage = () => {
  const user = useUserStore((state) => state.currentUser);
  const locale = useLocale();

  const { data, isLoading, isFetching, isError } = useQuery<IUserOrdersResponse>({
    queryKey: ['orders', user?.id, locale, 1, 10],
    queryFn: async () => {
      return await getUserOrders({ userId: user!.id, locale, page: 1, perPage: 10 });
    },
    enabled: Boolean(user?.id),
    staleTime: 60_000,
  });

  if (!user?.id) return <MainLoader />;

  if (isLoading || isFetching) {
    return <MainLoader />;
  }

  if (isError) {
    return <TryAgain />;
  }

  if (!data || !data.data?.length) {
    return (
      <div className="border border-slate-200 dark:border-slate-700 p-6 rounded-2xl text-center text-slate-500 dark:text-slate-400">
        Заказы не найдены
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {data.data.map((element) => (
        <li key={element.orderId}>
          <OrderCart item={element} />
        </li>
      ))}
    </ul>
  );
};

export default OrdersPage;
