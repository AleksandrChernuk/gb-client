import { IconPath } from '@/assets/icons/icon-path';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Link } from '@/shared/i18n/routing';
import { ChevronRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
interface RouteItemProps {
  fromName: string;
  toName: string;
  fromCountry: string;
  toCountry: string;
  price?: number | null;
  href: string;
  fromId?: string;
  toId?: string;
}

export async function RouteItem({
  fromName,
  toName,
  price,
  fromCountry,
  toCountry,
  href,
  fromId,
  toId,
}: RouteItemProps) {
  const t = await getTranslations(MESSAGE_FILES.COMMON);
  const searchParams = new URLSearchParams();
  if (fromId) searchParams.set('from', fromId);
  if (toId) searchParams.set('to', toId);

  const fullHref = searchParams.toString() ? `${href}?${searchParams.toString()}` : href;

  return (
    <Link
      href={fullHref}
      prefetch={false}
      className="flex items-center justify-between gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 hover:border-green-500 dark:hover:border-green-500 transition-colors"
    >
      <div className="flex items-center gap-2 min-w-0 flex-1 overflow-hidden">
        <div className="flex flex-col gap-0.5">
          <span className="truncate text-base ... tablet:text-lg font-medium text-slate-700 dark:text-slate-50">
            {fromName}
          </span>
          <span className="truncate text-xs font-medium text-slate-700 dark:text-slate-200">{fromCountry}</span>
        </div>

        <div className="w-12 h-3 tablet:w-16 tablet:h-5 flex items-center shrink-0">
          <IconPath />
        </div>

        <div className="flex flex-col gap-0.5">
          <span className="truncate text-base ... tablet:text-lg font-medium text-slate-700 dark:text-slate-50">
            {toName}
          </span>
          <span className="truncate text-xs font-medium text-slate-700 dark:text-slate-200">{toCountry}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {price != null && (
          <p className="text-sm text-green-400 dark:text-green-200 font-bold">
            {t('popular_routes_from')}
            {'  '}
            <span className="text-slate-700 dark:text-slate-50 text-lg tablet:text-xl">
              {price.toLocaleString('uk-UA')}
            </span>{' '}
            {t('currencypopular_routes_from')}
          </p>
        )}
        <ChevronRight size={18} className="text-slate-400" />
      </div>
    </Link>
  );
}
