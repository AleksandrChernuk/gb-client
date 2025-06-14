'use client';

import { Button } from '@/components/ui/button';
import { Link, usePathname } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Container } from './Container';

type TabItem = { slug: string; title: string };

type Props = {
  items: TabItem[];
  namespace: string;
};

export const NavTabs = ({ namespace, items }: Props) => {
  const t = useTranslations(namespace);
  const pathname = usePathname();

  return (
    <Container size="m" className="px-0 pl-5">
      <ul className="hidden tablet:flex items-start flex-col">
        {items.map((item) => (
          <li key={item.slug}>
            <Button
              asChild
              variant="link"
              className={`hover:no-underline p-2 text-sm font-normal tracking-normal leading-[21px] tablet:leading-4 laptop:text-base laptop:leading-[27px] text-slate-700 dark:text-slate-50 rounded-none border-l-2 border-l-[#e6e6e6] dark:border-l-slate-700 ${pathname === item.slug && 'text-green-300  border-b-green-300 tablet:border-b-none  dark:text-green-100 border-l-green-300  dark:border-l-green-100 font-medium'}`}
            >
              <Link prefetch={false} href={item.slug}>
                {t(item.title)}
              </Link>
            </Button>
          </li>
        ))}
      </ul>
    </Container>
  );
};
