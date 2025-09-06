'use client';

import { getUserCustomerAndPayments } from '@/actions/user.services.client';
import { useUserStore } from '@/store/useUser';
import { IUserPaymentsResponse } from '@/types/payments.Info.types';
import { useQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import PaymentsCard from './components/PaymentsCard';
import { MainLoader } from '@/components/shared/MainLoader';
import ErrorPaymant from './components/ErrorPaymants';

const PaymentsPage = () => {
  const user = useUserStore((state) => state.currentUser);
  const locale = useLocale();

  const { data, isLoading, error } = useQuery<IUserPaymentsResponse>({
    queryKey: ['payments', user?.id, locale],
    queryFn: async () => {
      const response = await getUserCustomerAndPayments({ userId: user!.id, locale, page: 1, perPage: 10 });
      return response;
    },
  });

  if (!data) return null;

  if (isLoading) {
    return <MainLoader />;
  }

  if (error) {
    return <ErrorPaymant />;
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
