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
      {navLinks.map(({ title, href, icon, ariaLabel }) => {
        const isExternalSocial = !!icon;

        return (
          <li key={href}>
            <Link
              href={href}
              prefetch={false}
              {...(isExternalSocial && {
                target: '_blank',
                rel: 'noopener noreferrer nofollow',
                'aria-label': t(ariaLabel || ''),
              })}
              className={
                isExternalSocial
                  ? 'inline-block p-2 bg-green-100 rounded-full hover:underline'
                  : 'inline-block text-sm font-normal tracking-normal leading-[21px] tablet:text-base tablet:leading-6 text-slate-400 dark:text-slate-200 hover:underline'
              }
            >
              {isExternalSocial ? icon : t(`${title}`)}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default FooterLinksList;
