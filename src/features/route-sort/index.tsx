'use client';

import { useRouterSearch } from '@/shared/hooks/useRouterSearch';
import { sortBuyItems } from '@/shared/constans/sortbuylist.constans';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Button } from '@/shared/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shared/ui/dropdown-menu';
import { ListFilter } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

const activeClass =
  'border-green-300 text-green-300 bg-green-50 dark:bg-green-300/10 dark:border-green-200 dark:text-green-200';
const inactiveClass =
  'border-slate-200 text-slate-700 bg-white hover:border-slate-300 dark:border-slate-600 dark:text-slate-200 dark:bg-slate-800 dark:hover:border-slate-500';

export default function RouteSort() {
  const [params, actions] = useRouterSearch();
  const t = useTranslations(MESSAGE_FILES.BUSES_PAGE);

  const isActive = (type: string) => params.sort === type;

  return (
    <>
      {/* Mobile — dropdown */}
      <div className="tablet:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" aria-label={t('sort_label')} className="flex w-fit text-sm cursor-pointer">
              {t('sort_label')} <ListFilter className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 space-y-1">
            {sortBuyItems.map(({ type, value, icon }) => (
              <DropdownMenuItem
                key={type}
                onClick={() => actions.setSort(type)}
                className={isActive(type) ? activeClass : ''}
              >
                {icon}
                <span className="ml-2">{t(value)}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Desktop — кнопки */}
      <div className="hidden tablet:flex items-center gap-2">
        {sortBuyItems.map(({ type, value }) => (
          <button
            key={type}
            onClick={() => actions.setSort(type)}
            className={cn(
              'h-8 px-3 laptop:h-9 laptop:px-4 text-xs laptop:text-sm rounded-full border transition-colors whitespace-nowrap cursor-pointer',
              isActive(type) ? activeClass : inactiveClass,
            )}
          >
            {t(value)}
          </button>
        ))}
      </div>
    </>
  );
}
