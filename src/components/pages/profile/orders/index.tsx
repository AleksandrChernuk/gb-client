'use client';

import { getUserOrders } from '@/actions/user.services.client';
import { useUserStore } from '@/store/useUser';
import { IUserOrdersResponse } from '@/types/payments.Info.types';
import { useQuery } from '@tanstack/react-query';
import { useLocale, useTranslations } from 'next-intl';
import { MainLoader } from '@/components/shared/MainLoader';
import TryAgain from '@/components/shared/TryAgain';
import OrderCart from './components/OrderCart';
import NoTripsFind from '@/components/shared/NoTripsFind';
import { isNoTripsError } from './helpers/isNoTripsError';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const OrdersPage = () => {
  const user = useUserStore((state) => state.currentUser);
  const t = useTranslations(MESSAGE_FILES.PROFILE);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 2;
  const locale = useLocale();

  const { data, isLoading, isFetching, isError, error } = useQuery<IUserOrdersResponse>({
    queryKey: ['orders', user?.id, locale, currentPage, perPage],
    queryFn: async () => {
      return await getUserOrders({ userId: user!.id, locale, page: currentPage, perPage });
    },
    enabled: Boolean(user?.id),
    staleTime: 60_000,
  });

  if (!user?.id) return <MainLoader />;

  if (isLoading || isFetching) {
    return <MainLoader />;
  }

  if (isError && isNoTripsError(error)) {
    return <NoTripsFind text="no_travel_find" className="dark:bg-slate-700" />;
  }

  if (isError) {
    return <TryAgain />;
  }

  if (!data || !data.data?.length) {
    return (
      <div className="border border-slate-200 dark:border-slate-700 p-6 rounded-2xl text-center text-slate-500 dark:text-slate-400">
        {t('orders_not_found')}
      </div>
    );
  }

  const { totalPages } = data.pagination;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Прокрутка вверх при смене страницы
    }
  };

  return (
    <ul className="space-y-8 max-w-[805px] mx-auto">
      {data.data.map((element) => (
        <li key={element.orderId}>
          <OrderCart item={element} />
        </li>
      ))}
      <li>
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <div>
              {currentPage !== 1 && (
                <Button
                  size={'icon'}
                  variant="outline"
                  disabled={currentPage === 1}
                  className="p-2"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Prev
                </Button>
              )}
            </div>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <div key={page}>
                <Button
                  size={'icon'}
                  className="p-2"
                  variant={currentPage === page ? 'default' : 'outline'}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Button>
              </div>
            ))}
            {currentPage !== totalPages && (
              <div>
                <Button
                  size={'icon'}
                  variant="outline"
                  className="p-2"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        )}
      </li>
    </ul>
  );
};

export default OrdersPage;
