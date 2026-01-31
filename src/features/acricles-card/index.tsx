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
  needDescription,
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
    <article className="group border rounded-xl bg-white dark:bg-slate-800 shadow-sm transition-color hover:shadow-md min-h-86 flex flex-col justify-between">
      <Link href={articleHref}>
        <div>
          {cover && (
            <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg overflow-hidden">
              <Image
                src={cover.url}
                alt={cover.alt || desc.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="h-full w-full rounded-t-lg object-cover transition-transform"
              />
            </AspectRatio>
          )}
          <h3 className="text-lg font-semibold text-primary  group-hover:text-green-600 transition-colors p-2">
            {desc.title}
          </h3>
          {needDescription && <p className="text-slate-700 dark:text-slate-50 p-2">{desc.description}</p>}
        </div>
      </Link>
      <div className="p-4 dark:border-slate-700 w-fit">
        <time
          dateTime={article.createdAt.toString()}
          className="text-xs text-green-200 p-2 border border-green-200 rounded-xl"
        >
          ⏱ {formatted}
        </time>
      </div>
    </article>
  );
}
