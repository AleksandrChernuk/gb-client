'use client';

import { getUserCustomerAndPayments } from '@/actions/user.services.client';
import { useUserStore } from '@/store/useUser';
import { IUserPaymentsResponse } from '@/types/payments.Info.types';
import { useLocale } from 'next-intl';
import PaymentsCard from './widgets/PaymentsCard';
import MainLoader from '@/components/shared/MainLoader';
import NoTripsFind from '@/components/shared/NoTripsFind';
import TryAgain from '@/components/shared/TryAgain';
import { usePaginatedQuery } from '@/hooks/usePaginatedQuery';
import { SkeletonCards } from '@/components/shared/SkeletonCards';
import { Pagination } from '@/components/shared/Pagination';

const perPage = 5;

const PaymentsPage = () => {
  const user = useUserStore((state) => state.currentUser);
  const locale = useLocale();

  const { data, isLoading, isFetching, isError, currentPage, handlePageChange, totalPages } =
    usePaginatedQuery<IUserPaymentsResponse>({
      baseKey: ['payments', user?.id, locale],
      enabled: Boolean(user?.id),
      perPage,
      initialPage: 1,
      fetchPage: (page, perPageArg) =>
        getUserCustomerAndPayments({ userId: user!.id, locale, page, perPage: perPageArg }),
      getTotalPages: (d) => d?.pagination?.totalPages ?? 1,
    });

  if (!user?.id) return <MainLoader className="min-h-full flex items-center justify-center" />;

  if (isError) {
    return (
      <NoTripsFind text="no_payments_find" className="dark:bg-slate-700 min-h-full flex items-center justify-center" />
    );
  }

  if (isError) {
    return <TryAgain className="min-h-full flex items-center justify-center" />;
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1">
        <div className="container mx-auto max-w-[805px] py-6">
          {isLoading || isFetching ? (
            <SkeletonCards items={perPage} />
          ) : !data || !data.data.payments.length ? (
            <NoTripsFind
              text="no_travel_find"
              className="dark:bg-slate-700 min-h-full flex items-center justify-center"
            />
          ) : (
            <div className="space-y-8">
              {data.data.payments.map((element) => (
                <PaymentsCard key={element.paymentId} item={element} customer={data.data.customer} />
              ))}
            </div>
          )}
        </div>
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          maxVisiblePages={3}
        />
      )}
    </div>
  );
};

export default PaymentsPage;
