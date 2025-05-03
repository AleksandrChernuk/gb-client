import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { getTranslations } from 'next-intl/server';
import { JSX } from 'react';

type Props = {
  className?: string;
  navLinks: {
    title: string;
    href: string;
    icon?: JSX.Element;
  }[];
};

export default async function FooterLinksList({ navLinks, className }: Props) {
  const t = await getTranslations(MESSAGE_FILES.COMMON);

  return (
    <ul className={cn('flex flex-col gap-1 tablet:gap-2', className)}>
      {navLinks.map(({ title, href, icon }) =>
        icon ? (
          <li key={href}>
            <Link prefetch={false} href={href} className="inline-block p-1 bg-green-100 rounded-full">
              {icon}
            </Link>
          </li>
        ) : (
          <li key={href}>
            <Link
              prefetch={false}
              href={href}
              className="inline-block text-sm font-normal tracking-normal leading-[21px] tablet:text-base tablet:leading-6 text-slate-400 dark:text-slate-200"
            >
              {t(`${title}`)}
            </Link>
          </li>
        ),
      )}
    </ul>
  );
}
