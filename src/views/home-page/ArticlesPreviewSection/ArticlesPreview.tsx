import { ArticleCard } from '@/features/acricles-card';
import { getArticles } from '@/shared/api/articles.actions';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { isErrorResponse } from '@/shared/lib/isErrorResponse';
import { Button } from '@/shared/ui/button';
import { Container } from '@/shared/ui/Container';
import { ArticlesSkeleton } from '@/views/home-page/ArticlesPreviewSection/ArticlesSkeleton';
import { Locale } from 'next-intl';
import { getLocale, getTranslations } from 'next-intl/server';
import Link from 'next/link';

export const ArticlesPreview = async () => {
  const locale = (await getLocale()) as Locale;

  const t = await getTranslations(MESSAGE_FILES.COMMON);
  const data = await getArticles({ page: 1, perPage: 3 });

  if (isErrorResponse(data)) {
    return (
      <section className="py-8 tablet:py-16">
        <Container size="m">
          <h2 className="mb-4 text-2xl leading-[28.8px] laptop:text-[32px] font-bold tracking-normal laptop:leading-[38.4px] laptop:mb-8 text-slate-700 dark:text-slate-50">
            {t('articles_title')}
          </h2>
          <ArticlesSkeleton />
        </Container>
      </section>
    );
  }

  return (
    <section className="py-8 tablet:py-16 ">
      <Container size="m">
        <h2 className="mb-4 text-2xl leading-[28.8px] laptop:text-[32px] font-bold tracking-normal laptop:leading-[38.4px] laptop:mb-8 text-slate-700 dark:text-slate-50">
          {t('articles_title')}
        </h2>
        <ul className="grid grid-cols-1 tablet:grid-cols-3 gap-4 mb-4">
          {data.data.map((article) => (
            <li key={article.id}>
              <ArticleCard needDescription={false} article={article} lang={locale} />
            </li>
          ))}
        </ul>
        <div className="text-right">
          <Button variant={'default'} size={'secondary'} asChild>
            <Link prefetch={false} href={'/blog'} title={t('articles_link_title')}>
              {t('all_news')}
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
};
