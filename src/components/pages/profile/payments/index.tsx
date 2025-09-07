'use client';

import { getUserCustomerAndPayments } from '@/actions/user.services.client';
import { useUserStore } from '@/store/useUser';
import { IUserPaymentsResponse } from '@/types/payments.Info.types';
import { useQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import PaymentsCard from './components/PaymentsCard';
import { MainLoader } from '@/components/shared/MainLoader';
import TryAgain from '@/components/shared/TryAgain';

const PaymentsPage = () => {
  const user = useUserStore((state) => state.currentUser);
  const locale = useLocale();

  const { data, isLoading, isFetching, isError } = useQuery<IUserPaymentsResponse>({
    queryKey: ['payments', user?.id, locale],
    queryFn: async () => {
      const response = await getUserCustomerAndPayments({ userId: user!.id, locale, page: 1, perPage: 10 });
      return response;
    },
  });

  if (!user?.id) return <MainLoader />;

  if (isLoading || isFetching) {
    return <MainLoader />;
  }

  if (isError) {
    return <TryAgain />;
  }

  if (!data || !data.data?.payments.length) {
    return (
      <div className="border border-slate-200 dark:border-slate-700 p-6 rounded-2xl text-center text-slate-500 dark:text-slate-400">
        Платежів не найдены
      </div>
    );
  }

  const { customer, payments } = data.data;

  return (
    <ul className="space-y-4">
      {payments.map((element) => (
        <li key={element.paymentId}>
          <PaymentsCard item={element} customer={customer} />
        </li>
      ))}
    </ul>
  );
};

export default PaymentsPage;
