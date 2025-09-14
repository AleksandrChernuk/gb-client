'use client';

import { getUserOrders } from '@/actions/user.services.client';
import { useUserStore } from '@/store/useUser';
import { IUserOrdersResponse } from '@/types/payments.Info.types';
import { useLocale } from 'next-intl';
import MainLoader from '@/components/shared/MainLoader';
import TryAgain from '@/components/shared/TryAgain';
import OrderCart from './components/OrderCart';
import NoTripsFind from '@/components/shared/NoTripsFind';
import { isNoTripsError } from './helpers/isNoTripsError';
import { Pagination } from '@/components/shared/Pagination';
import { usePaginatedQuery } from '@/hooks/usePaginatedQuery';
import { SkeletonCards } from '@/components/shared/SkeletonCards';

const perPage = 10;

const OrdersPage = () => {
  const user = useUserStore((state) => state.currentUser);
  const locale = useLocale();

  const { data, isLoading, isFetching, isError, error, currentPage, handlePageChange, totalPages } =
    usePaginatedQuery<IUserOrdersResponse>({
      baseKey: ['orders', user?.id, locale],
      enabled: Boolean(user?.id),
      perPage,
      initialPage: 1,
      fetchPage: (page, perPageArg) => getUserOrders({ userId: user!.id, locale, page, perPage: perPageArg }),
      getTotalPages: (d) => d?.pagination?.totalPages ?? 1,
    });

  if (!user?.id) return <MainLoader className="min-h-full flex items-center justify-center" />;

  if (isError && isNoTripsError(error)) {
    return (
      <NoTripsFind text="no_travel_find" className="dark:bg-slate-700 min-h-full flex items-center justify-center" />
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
          ) : !data || !data.data?.length ? (
            <NoTripsFind
              text="no_travel_find"
              className="dark:bg-slate-700 min-h-full flex items-center justify-center"
            />
          ) : (
            <div className="space-y-8">
              {data.data.map((element) => (
                <OrderCart key={element.orderId} item={element} />
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

export default OrdersPage;
