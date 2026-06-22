import { ArticleCard } from '@/features/acricles-card';
import { getArticles } from '@/shared/api/articles.actions';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { IArticleListItem } from '@/shared/types/article.types';
import { H2 } from '@/shared/ui/H2';
import { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

type RelatedArticlesProps = {
  lng: Locale;
  currentSlug: string;
  countryId?: number | null;
  locationId?: number | null;
};

const TAKE = 3;

export async function RelatedArticles({ lng, currentSlug, countryId, locationId }: RelatedArticlesProps) {
  const collected = new Map<string, IArticleListItem>();

  const add = (items: IArticleListItem[]) => {
    for (const item of items) {
      if (item.slug === currentSlug || collected.has(item.slug)) continue;
      collected.set(item.slug, item);
      if (collected.size >= TAKE) break;
    }
  };

  // Підбираємо статті від найрелевантніших до загальних:
  // спершу той самий напрямок (locationId), потім країна, потім просто свіжі.
  if (locationId && collected.size < TAKE) {
    const res = await getArticles({ language: lng, perPage: TAKE + 1, locationId });
    add(res.data);
  }

  if (countryId && collected.size < TAKE) {
    const res = await getArticles({ language: lng, perPage: TAKE + 1, countryId });
    add(res.data);
  }

  if (collected.size < TAKE) {
    const res = await getArticles({ language: lng, perPage: TAKE + 4 });
    add(res.data);
  }

  const related = [...collected.values()];

  if (related.length === 0) return null;

  const t = await getTranslations(MESSAGE_FILES.COMMON);

  return (
    <section className="mt-16">
      <H2>{t('related_articles')}</H2>
      <ul className="mt-4 grid grid-cols-1 gap-4 tablet:grid-cols-3">
        {related.map((article) => (
          <li key={article.id}>
            <ArticleCard article={article} lang={lng} />
          </li>
        ))}
      </ul>
    </section>
  );
}
