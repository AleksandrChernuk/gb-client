'use client';

import { getUserCustomerAndPayments } from '@/actions/user.services.client';
import { useUserStore } from '@/store/useUser';
import { IUserPaymentsResponse } from '@/types/payments.Info.types';
import { useQuery } from '@tanstack/react-query';
import { useLocale, useTranslations } from 'next-intl';
import PaymentsCard from './components/PaymentsCard';
import MainLoader from '@/components/shared/MainLoader';
import { isNoPaymentsError } from './helpers/isNoPaymentsError';
import { MESSAGE_FILES } from '@/config/message.file.constans';

const PaymentsPage = () => {
  const user = useUserStore((state) => state.currentUser);
  const t = useTranslations(MESSAGE_FILES.PROFILE);
  const locale = useLocale();

  const { data, isLoading, isFetching, isError, error } = useQuery<IUserPaymentsResponse>({
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

  if (isError && isNoPaymentsError(error)) {
    return (
      <div className="text-base tablet:text-lg text-center text-slate-700 dark:text-slate-200">
        {t('no_payments_find')}
      </div>
    );
  }

  if (!data || !data.data?.payments.length) {
    return (
      <div className="text-base tablet:text-lg text-center text-slate-500 dark:text-slate-400">
        {t('no_payments_find')}
      </div>
    );
  }

  const { customer, payments } = data.data;

  return (
    <div className="max-w-[960px]">
      <ul className="space-y-6 tablet:space-y-8">
        {payments.map((element) => (
          <li key={element.paymentId}>
            <PaymentsCard item={element} customer={customer} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentsPage;
