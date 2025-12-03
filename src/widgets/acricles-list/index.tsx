'use client';

import { SkeletonCards } from '@/shared/ui/SkeletonCards';
import { usePaginatedQuery } from '@/shared/hooks/usePaginatedQuery';
import { CustomPagination } from '@/shared/ui/CustomPagination';
import Image from 'next/image';
import { AspectRatio } from '@/shared/ui/aspect-ratio';
import Link from 'next/link';
import { Button } from '@/shared/ui/button';
import { IArticleResponse, TGetArticlesResponse } from '@/shared/types/article.types';
import { getArticles } from '@/shared/api/articles.actions';
import { useState } from 'react';
import { Loader } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
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
        skeletonClassName="min-h-[720px]"
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
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4 mb-4">
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

function getDescriptionByLang(article: IArticleResponse, lang: string) {
  return article.descriptions.find((d) => d.language === lang) ?? article.descriptions[0];
}

function ArticleCard({ article, lang }: { article: IArticleResponse; lang: string; onDelete?: (id: string) => void }) {
  const desc = getDescriptionByLang(article, lang);
  const cover = article.photos.find((p) => p.isCover);
  const [loading, setLoading] = useState(false);
  const t = useTranslations(MESSAGE_FILES.COMMON);

  return (
    <div className="border rounded-xl p-2 space-y-4 bg-white dark:bg-slate-800 shadow-sm flex flex-col justify-between">
      <div className="space-y-4">
        {cover && (
          <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
            <Image src={cover.url} alt={cover.alt} fill className="h-full w-full rounded-lg object-cover" />
          </AspectRatio>
        )}
        <h2 className="text-2xl font-semibold">{desc.title}</h2>
        <div
          className="prose max-w-none space-y-4 dark:text-slate-200"
          dangerouslySetInnerHTML={{ __html: desc.description }}
        />
      </div>

      {/* <div className="flex flex-wrap gap-2">
        {article.hashtags.map((tag) => (
          <span key={tag} className="px-2 py-1 text-sm bg-gray-100 rounded-md">
            #{tag}
          </span>
        ))}
      </div> */}

      <div className="flex items-center justify-end gap-3 pt-3">
        <Link href={`/blog/${article.slug}`} onClick={() => setLoading(true)}>
          <Button variant="outline" size="sm" className="flex gap-1">
            {t('read')} {loading && <Loader className="animate-spin" />}
          </Button>
        </Link>
      </div>
    </div>
  );
}
