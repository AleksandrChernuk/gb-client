import { CustomPagination } from '@/shared/ui/CustomPagination';
import { TGetArticlesResponse } from '@/shared/types/article.types';
import { ArticleCard } from '@/features/acricles-card';
import { getLocale } from 'next-intl/server';

type ArticlesListProps = {
  articles: TGetArticlesResponse;
};

export default async function AcriclesList({ articles }: ArticlesListProps) {
  const locale = await getLocale();

  if (!articles.data.length) {
    return <div className="py-10 text-center">Даних не знайдено</div>;
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-4 mb-4">
        {articles.data.map((article) => (
          <ArticleCard key={article.id} article={article} lang={locale} />
        ))}
      </div>

      {articles.pagination && articles.pagination.totalPages > 1 && (
        <CustomPagination
          currentPage={articles.pagination.page}
          totalPages={articles.pagination.totalPages}
          handlePageChange={() => {}}
          maxVisiblePages={3}
        />
      )}
    </div>
  );
}
