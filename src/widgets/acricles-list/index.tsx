'use client';

import { SkeletonCards } from '@/shared/ui/SkeletonCards';
import { usePaginatedQuery } from '@/shared/hooks/usePaginatedQuery';
import { CustomPagination } from '@/shared/ui/CustomPagination';
import { TGetArticlesResponse } from '@/shared/types/article.types';
import { getArticles } from '@/shared/api/articles.actions';
import { useLocale } from 'next-intl';
import { ArticleCard } from '@/features/acricles-card';
const perPage = 20;

function isErrorResponse(res: TGetArticlesResponse | { error: string }): res is { error: string } {
  return 'error' in res;
}

export default function AcriclesList() {
  const locale = useLocale();
  const { data, isLoading, isFetching, currentPage, handlePageChange, totalPages } = usePaginatedQuery<
    TGetArticlesResponse | { error: string }
  >({
    baseKey: ['articles', perPage],
    perPage,
    initialPage: 1,
    fetchPage: (page, perPageArg) =>
      getArticles({
        page,
        perPage: perPageArg,
      }),

    getTotalPages: (d) => (!d || isErrorResponse(d) ? 1 : (d.pagination?.totalPages ?? 1)),
  });

  if (isLoading || isFetching) {
    return (
      <SkeletonCards
        className="space-y-0 grid grid-cols-1 tablet:grid-cols-2 gap-4 mb-4"
        items={4}
        skeletonClassName="min-h-[420px]"
      />
    );
  }

  if (!data || 'error' in data) {
    return <div className="text-red-600 text-center py-10">{data?.error || 'Помилка завантаження'}</div>;
  }

  if (!data.data.length) {
    return <div className="py-10 text-center">Данних не знайдено</div>;
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1">
        <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-4 mb-4">
          {data.data.map((article) => (
            <ArticleCard key={article.createdAt.toString()} article={article} lang={locale} />
          ))}
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
