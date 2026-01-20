import { ArticleCard } from '@/features/acricles-card';
import { getArticles } from '@/shared/api/articles.actions';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { TGetArticlesResponse } from '@/shared/types/article.types';
import { Button } from '@/shared/ui/button';
import { Container } from '@/shared/ui/Container';
import { Locale } from 'next-intl';
import { getLocale, getTranslations } from 'next-intl/server';
import Link from 'next/link';

function isErrorResponse(res: TGetArticlesResponse | { error: string }): res is { error: string } {
  return 'error' in res;
}

export const ArticlesPreview = async () => {
  const locale = await getLocale();
  const t = await getTranslations(MESSAGE_FILES.COMMON);
  const data = await getArticles({
    page: 1,
  });

  if (isErrorResponse(data)) {
    return (
      <section className="py-8 tablet:py-16">
        <Container size="m">
          <h3 className="mb-4 text-2xl leading-[28.8px] laptop:text-[32px] font-bold tracking-normal laptop:leading-[38.4px] laptop:mb-8 text-slate-700 dark:text-slate-50">
            {t('articles_title')}
          </h3>

          <div className="grid grid-cols-1 tablet:grid-cols-3 gap-4 mb-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-60 bg-slate-200 dark:bg-slate-700 animate-pulse rounded-xl" />
            ))}
          </div>
        </Container>
      </section>
    );
  }
  const items = data.data.slice(0, 3);

  return (
    <section className="py-8 tablet:py-16 ">
      <Container size="m">
        <h2 className="mb-4 text-2xl leading-[28.8px] laptop:text-[32px] font-bold tracking-normal laptop:leading-[38.4px] laptop:mb-8 text-slate-700 dark:text-slate-50">
          {t('articles_title')}
        </h2>
        <ul className="grid grid-cols-1 tablet:grid-cols-3 gap-4 mb-4">
          {items.map((article) => (
            <li key={article.id}>
              <ArticleCard needDescription={false} article={article} lang={locale as Locale} />
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
