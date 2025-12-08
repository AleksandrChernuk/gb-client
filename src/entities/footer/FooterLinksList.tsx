import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Link } from '@/shared/i18n/routing';
import { cn } from '@/shared/lib/utils';
import { getTranslations } from 'next-intl/server';
import { JSX } from 'react';

type Props = {
  className?: string;
  navLinks: {
    title: string;
    href: string;
    icon?: JSX.Element;
    ariaLabel?: string;
  }[];
};

const FooterLinksList = async ({ navLinks, className }: Props) => {
  const t = await getTranslations(MESSAGE_FILES.COMMON);

  return (
    <ul className={cn('flex flex-col gap-1 tablet:gap-2', className)}>
      {navLinks.map(({ title, href, icon, ariaLabel }) =>
        icon ? (
          <li key={href}>
            <Link
              target="_blanck"
              prefetch={false}
              aria-label={t(ariaLabel || '')}
              href={href}
              className="inline-block p-2 bg-green-100 rounded-full hover:underline"
            >
              {icon}
            </Link>
          </li>
        ) : (
          <li key={href}>
            <Link
              prefetch={false}
              href={href}
              className="inline-block text-sm font-normal tracking-normal leading-[21px] tablet:text-base tablet:leading-6 text-slate-400 dark:text-slate-200 hover:underline"
            >
              {t(`${title}`)}
            </Link>
          </li>
        ),
      )}
    </ul>
  );
};

export default FooterLinksList;
