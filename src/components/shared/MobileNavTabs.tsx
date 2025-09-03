'use client';

import { Button } from '@/components/ui/button';
import { Link, usePathname } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';

type TabItem = { slug: string; title: string };

type Props = {
  items: TabItem[];
  namespace: string;
};

export const MobileNavTabs = ({ namespace, items }: Props) => {
  const t = useTranslations(namespace);
  const pathname = usePathname();

  const sortedItems = [...items].sort((a, b) => {
    if (a.slug === pathname) return -1;
    if (b.slug === pathname) return 1;
    return 0;
  });

  return (
    <>
      <ScrollArea className="w-full whitespace-nowrap">
        <ul className="flex items-center gap-2 flex-row tablet:hidden m-4">
          {sortedItems.map((item) => (
            <li key={item.slug}>
              <Button
                asChild
                variant="outline"
                className={`py-2 px-4 text-sm font-normal tracking-normal leading-[21px] text-slate-700 dark:text-slate-50 ${pathname === item.slug && 'text-green-300 border-green-300 dark:text-green-300  dark:border-green-300'}`}
              >
                <Link prefetch={false} href={item.slug}>
                  {t(item.title)}
                </Link>
              </Button>
            </li>
          ))}
        </ul>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
};
