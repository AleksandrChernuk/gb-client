'use client';

import { Button } from '@/components/ui/button';
import { Link, usePathname } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

type TabItem = { slug: string; title: string };

type Props = {
  items: TabItem[];
  namespace: string;
};

export const NavTabs = ({ namespace, items }: Props) => {
  const t = useTranslations(namespace);
  const pasname = usePathname();
  console.log(pasname);
  return (
    <ul className="flex items-start gap-2 overflow-x-scroll tablet:overflow-hidden tablet:gap-0 tablet:flex-col no-scrollbar">
      {items.map((item) => (
        <li key={item.slug}>
          <Button
            asChild
            variant="link"
            className={`hover:no-underline  p-2 text-sm font-normal tracking-normal leading-[21px] tablet:p-4 tablet:text-sm tablet:font-normal tablet:leading-4 tablet:tracking-normal laptop:text-lg laptop:leading-[27px] text-slate-700 dark:text-slate-50  rounded-none  tablet:dark:border-b-slate-700 tablet:border-b-0 tablet:border-l-2  tablet:border-l-[#e6e6e6] tablet:dark:border-l-slate-700   border-b-2  ${pasname === item.slug && 'text-green-300 border-b-green-300 tablet:border-b-none dark:border-b-green-100 tablet:border-l-green-300 tablet:dark:border-l-green-100'}`}
          >
            <Link prefetch={false} href={item.slug}>
              {t(item.title)}
            </Link>
          </Button>
        </li>
      ))}
    </ul>
  );
};
