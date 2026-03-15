'use client';

import { Link, usePathname } from '@/shared/i18n/routing';
import { cn } from '@/shared/lib/utils';
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
  const isActive = (slug: string) => pathname === slug || pathname.endsWith(slug);

  return (
    <Container size="m" className="px-0">
      <ul className="hidden tablet:flex items-start flex-col">
        {items.map((item) => (
          <li key={item.slug}>
            <Button
              asChild
              variant="link"
              className={cn(
                'hover:no-underline px-2 py-6 text-sm font-normal tracking-normal leading-5.25',
                'tablet:leading-4 laptop:text-base laptop:leading-6.75',
                'text-slate-700 dark:text-slate-50 rounded-none border-l-2 border-l-[#e6e6e6] dark:border-l-slate-700',
                isActive(item.slug) &&
                  'text-green-200 dark:text-green-100 border-l-green-200 dark:border-l-green-100 font-medium',
              )}
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
