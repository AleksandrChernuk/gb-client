'use client';

import { IArticleResponse } from '@/shared/types/article.types';
import { AspectRatio } from '@/shared/ui/aspect-ratio';
import { format } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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
  onDelete?: (id: string) => void;
  needDescription?: boolean;
}) {
  const router = useRouter();
  const desc = getDescriptionByLang(article, lang);
  const cover = article.photos.find((p) => p.isCover);

  const handleClick = () => {
    router.push(`/blog/${article.slug}`, { scroll: true });
  };

  const formatted = format(article.createdAt || new Date(), 'dd.MM.yyyy');

  return (
    <div
      className="border rounded-xl space-y-4 bg-white dark:bg-slate-800 shadow-sm flex flex-col justify-between cursor-pointer min-h-100"
      onClick={handleClick}
    >
      <div>
        {cover && (
          <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
            <Image src={cover.url} alt={cover.alt} fill className="h-full w-full rounded-t-lg object-cover" />
          </AspectRatio>
        )}
        <div className="p-2 space-y-2">
          <h2 className="text-lg font-semibold hover:underline">{desc.title}</h2>
          {needDescription && <p className="text-sm dark:text-slate-200">{desc.description}</p>}{' '}
        </div>
      </div>

      <div className="p-2">
        <p className="text-xs text-slate-400">⏱ {formatted}</p>
      </div>
    </div>
  );
}
