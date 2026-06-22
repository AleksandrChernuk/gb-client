import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Link } from '@/shared/i18n/routing';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

type ArticleAuthorBoxProps = {
  slug: string;
  name: string;
  role?: string | null;
  photo?: string | null;
  bio?: string | null;
};

export async function ArticleAuthorBox({ slug, name, role, photo, bio }: ArticleAuthorBoxProps) {
  if (!name) return null;

  const t = await getTranslations(MESSAGE_FILES.COMMON);
  const authorHref = `/authors/${slug}/`;

  return (
    <aside className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="flex flex-col gap-5 tablet:flex-row tablet:items-start">
        {photo ? (
          <Image
            src={photo}
            alt={name}
            width={120}
            height={120}
            className="h-28 w-28 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span
            aria-hidden
            className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-green-200 text-2xl font-semibold text-green-700 dark:bg-slate-700 dark:text-green-200"
          >
            {name.charAt(0)}
          </span>
        )}
        <div className="min-w-0">
          <p className="text-xl font-bold text-slate-900 dark:text-slate-50">{name}</p>
          {role && (
            <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-green-600 dark:text-green-300">
              {role}
            </p>
          )}
          {bio && <p className="mt-3 text-slate-700 dark:text-slate-200">{bio}</p>}
          <Link
            href={authorHref}
            prefetch={false}
            className="mt-4 inline-block font-semibold text-green-600 transition-colors hover:text-green-700 dark:text-green-300"
          >
            {t('author_more')}
          </Link>
        </div>
      </div>
    </aside>
  );
}
