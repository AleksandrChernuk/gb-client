'use client';

import ProfileOrderCard from '@/features/profile-order-card';
import { getUserOrders } from '@/shared/api/user.services.client';
import { usePaginatedQuery } from '@/shared/hooks/usePaginatedQuery';
import { TRANSLATION_KEYS } from '@/shared/i18n/translationKeys';
import { useUserStore } from '@/shared/store/useUser';
import { CustomPagination } from '@/shared/ui/CustomPagination';
import RouteNotFound from '@/shared/ui/RouteNotFound';
import { SkeletonCards } from '@/shared/ui/SkeletonCards';
import { isNoTripsError } from '@/shared/utils/route.details.helper';
import { useLocale, useTranslations } from 'next-intl';

const perPage = 5;

export default function ProfileOrdersList() {
  const user = useUserStore((state) => state.currentUser);
  const t = useTranslations();
  const locale = useLocale();

  const { data, isLoading, isFetching, isError, error, currentPage, handlePageChange, totalPages } = usePaginatedQuery({
    baseKey: ['orders', user?.id, locale],
    enabled: Boolean(user?.id),
    perPage,
    initialPage: 1,
    fetchPage: (page, perPageArg) => getUserOrders({ userId: user!.id, locale, page, perPage: perPageArg }),
    getTotalPages: (d) => d?.pagination?.totalPages ?? 1,
  });

  if (isError && isNoTripsError(error)) {
    return <RouteNotFound text={t(TRANSLATION_KEYS.common.not_found)} className="dark:bg-slate-700" />;
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1">
        <div className="container mx-auto max-w-[805px] py-6">
          {isLoading || isFetching ? (
            <SkeletonCards items={perPage} />
          ) : !data || !data.data?.length ? (
            <RouteNotFound text={t(TRANSLATION_KEYS.common.not_found)} className="dark:bg-slate-700" />
          ) : (
            <div className="space-y-8">
              {data.data.map((element) => (
                <ProfileOrderCard key={element.orderId} item={element} />
              ))}
            </div>
          )}
        </div>
      </div>

      {totalPages > 1 && (
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          maxVisiblePages={3}
        />
      )}
    </div>
  );
}
