import { IArticleListItem } from '@/shared/types/article.types';
import { AspectRatio } from '@/shared/ui/aspect-ratio';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

export function ArticleCard({
  article,
  lang,
  needDescription,
}: {
  article: IArticleListItem;
  lang: string;
  needDescription?: boolean;
}) {
  const { texts, photo, author } = article;
  const formatted = format(article.createdAt || new Date(), 'dd.MM.yyyy');

  const articleHref = `/${lang}/blog/${article.slug}/`;

  return (
    <article className="group border rounded-xl bg-white dark:bg-slate-800 shadow-sm transition-color hover:shadow-md min-h-86 flex flex-col justify-between">
      <Link href={articleHref}>
        <div>
          {photo && (
            <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg overflow-hidden">
              <Image
                src={photo.url}
                alt={photo.alt || texts.title}
                fill
                quality={65}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 400px"
                className="h-full w-full rounded-t-lg object-cover transition-transform"
              />
            </AspectRatio>
          )}
          <h3 className="text-lg font-semibold text-primary  group-hover:text-green-600 transition-colors p-2">
            {texts.title}
          </h3>
          {needDescription && <p className="text-slate-700 dark:text-slate-50 p-2">{texts.description}</p>}
        </div>
      </Link>
      <div className="flex items-center justify-between gap-2 p-4 dark:border-slate-700">
        {author?.name?.authorName && (
          <Link
            href={`/${lang}/authors/${author.slug}/`}
            prefetch={false}
            className="flex min-w-0 items-center gap-2"
          >
            {author.photo && (
              <Image
                src={author.photo}
                alt={author.name.authorName}
                width={28}
                height={28}
                className="h-7 w-7 rounded-full object-cover"
              />
            )}
            <span className="truncate text-xs text-slate-600 dark:text-slate-300">
              {author.name.authorName}
            </span>
          </Link>
        )}
        <time
          dateTime={article.createdAt.toString()}
          className="shrink-0 text-xs text-green-400 dark:text-green-200 p-2 border border-green-200 rounded-xl"
        >
          ⏱ {formatted}
        </time>
      </div>
    </article>
  );
}
