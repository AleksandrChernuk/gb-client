import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Link } from '@/shared/i18n/routing';
import { Button } from '@/shared/ui/button';
import { getTranslations } from 'next-intl/server';

type Props = {
  slug: string;
};

const navItems = [
  { href: '/faq/bronjuvannja-mists', key: 'booking_seats' },
  { href: '/faq/routes-and-buses', key: 'flights_and_buses' },
  { href: '/faq/ticket-refund', key: 'ticket_refund' },
] as const;

export default async function FaqNav({ slug }: Props) {
  const t = await getTranslations(MESSAGE_FILES.QUESTIONS_PAGE);

  const baseClasses =
    'p-2 text-sm font-normal leading-[21px] text-slate-700 dark:text-slate-50 ' +
    'tablet:p-4 tablet:rounded-none tablet:border-b-0 tablet:border-l-2 tablet:border-l-[#e6e6e6] ' +
    'tablet:dark:border-l-slate-700 laptop:text-lg laptop:leading-[27px]';

  const activeClasses = 'text-green-200 dark:text-green-100 tablet:border-l-green-300 tablet:dark:border-l-green-100';

  const isActive = (href: string) => slug === href || (slug === '/faq' && href === '/faq/bronjuvannja-mists');

  return (
    <nav
      className="flex items-start gap-2 overflow-x-scroll tablet:overflow-hidden tablet:gap-0 tablet:flex-col no-scrollbar"
      aria-label={t('title')}
    >
      {navItems.map(({ href, key }) => (
        <Button key={href} asChild variant="link" className={`${baseClasses} ${isActive(href) ? activeClasses : ''}`}>
          <Link href={href} aria-current={isActive(href) ? 'page' : undefined}>
            {t(key)}
          </Link>
        </Button>
      ))}
    </nav>
  );
}
