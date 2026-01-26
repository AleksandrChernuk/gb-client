import { IArticleResponse } from '@/shared/types/article.types';
import { AspectRatio } from '@/shared/ui/aspect-ratio';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

function getDescriptionByLang(article: IArticleResponse, lang: string) {
  return article.descriptions.find((d) => d.language === lang) ?? article.descriptions[0];
}

export function ArticleCard({
  article,
  lang,
  needDescription = true,
}: {
  article: IArticleResponse;
  lang: string;
  needDescription?: boolean;
}) {
  const desc = getDescriptionByLang(article, lang);
  const cover = article.photos.find((p) => p.isCover);
  const formatted = format(article.createdAt || new Date(), 'dd.MM.yyyy');

  const articleHref = `/${lang}/blog/${article.slug}`;

  return (
    <article className="group border rounded-xl bg-white dark:bg-slate-800 shadow-sm flex flex-col justify-between min-h-100 transition-all hover:shadow-md">
      <Link href={articleHref} className="flex flex-col h-full">
        <div>
          {cover && (
            <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg overflow-hidden">
              <Image
                src={cover.url}
                alt={cover.alt || desc.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="h-full w-full rounded-t-lg object-cover transition-transform group-hover:scale-105"
              />
            </AspectRatio>
          )}
          <div className="p-4 space-y-2">
            <h3 className="text-lg font-semibold group-hover:text-green-600 transition-colors">{desc.title}</h3>

            {needDescription && (
              <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3">{desc.description}</p>
            )}
          </div>
        </div>

        <div className="p-4 mt-auto border-t border-slate-50 dark:border-slate-700">
          <time dateTime={article.createdAt.toString()} className="text-xs text-slate-400">
            ⏱ {formatted}
          </time>
        </div>
      </Link>
    </article>
  );
}
