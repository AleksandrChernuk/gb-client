'use client';

import { Link, usePathname } from '@/shared/i18n/routing';
import { Button } from '@/shared/ui/button';
import { Container } from '@/shared/ui/Container';
import { useTranslations } from 'next-intl';

type TabItem = { slug: string; title: string };

type Props = {
  items: TabItem[];
  namespace: string;
};

const ProfileNavTabs = ({ namespace, items }: Props) => {
  const t = useTranslations(namespace);
  const pathname = usePathname();

  return (
    <Container size="m" className="px-0">
      <ul className="hidden tablet:flex items-start flex-col">
        {items.map((item) => (
          <li key={item.slug}>
            <Button
              asChild
              variant="link"
              className={`hover:no-underline px-2 py-6 text-sm font-normal tracking-normal leading-[21px] tablet:leading-4 laptop:text-base laptop:leading-[27px] text-slate-700 dark:text-slate-50 rounded-none border-l-2 border-l-[#e6e6e6] dark:border-l-slate-700 ${pathname === item.slug && 'text-green-200  border-b-green-200 tablet:border-b-none  dark:text-green-100 border-l-green-200  dark:border-l-green-100 font-medium'}`}
            >
              <Link href={item.slug}>{t(item.title)}</Link>
            </Button>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default ProfileNavTabs;
