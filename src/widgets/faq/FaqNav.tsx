'use client';

import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Link } from '@/shared/i18n/routing';
import { Button } from '@/shared/ui/button';
import { useTranslations } from 'next-intl';

type Props = {
  slug: string;
};

export default function FaqNav({ slug }: Props) {
  const t = useTranslations(MESSAGE_FILES.QUESTIONS_PAGE);
  return (
    <div className="flex items-start gap-2 overflow-x-scroll tablet:overflow-hidden tablet:gap-0 tablet:flex-col no-scrollbar">
      <Button
        key={'/faq/bronjuvannja-mists'}
        asChild
        variant="link"
        className={`p-2 text-sm font-normal tracking-normal leading-[21px] tablet:p-4 tablet:text-sm tablet:font-normal tablet:leading-4 tablet:tracking-normal laptop:text-lg laptop:leading-[27px] text-slate-700 dark:text-slate-50 tablet:rounded-none  tablet:dark:border-b-slate-700 tablet:border-b-0 tablet:border-l-2  tablet:border-l-[#e6e6e6] tablet:dark:border-l-slate-700  ${(slug === '/faq/bronjuvannja-mists' || slug === '/faq') && 'text-green-200 tablet:border-l-green-300 tablet:dark:border-l-green-100'}`}
      >
        <Link prefetch={false} href={'/faq/bronjuvannja-mists'}>
          {t('booking_seats')}
        </Link>
      </Button>
      <Button
        key={'/faq/routes-and-buses'}
        asChild
        variant="link"
        className={`p-2 text-sm font-normal tracking-normal leading-[21px] tablet:p-4 tablet:text-sm tablet:font-normal tablet:leading-4 tablet:tracking-normal laptop:text-lg laptop:leading-[27px] text-slate-700 dark:text-slate-50 rounded-none  tablet:dark:border-b-slate-700 tablet:border-b-0 tablet:border-l-2  tablet:border-l-[#e6e6e6] tablet:dark:border-l-slate-700   ${slug === '/faq/routes-and-buses' && 'text-green-200  tablet:border-l-green-300 tablet:dark:border-l-green-100'}`}
      >
        <Link prefetch={false} href={'/faq/routes-and-buses'}>
          {t('flights_and_buses')}
        </Link>
      </Button>
      <Button
        key={'/faq/ticket-refund'}
        asChild
        variant="link"
        className={`p-2 text-sm font-normal tracking-normal leading-[21px] tablet:p-4 tablet:text-sm tablet:font-normal tablet:leading-4 tablet:tracking-normal laptop:text-lg laptop:leading-[27px] text-slate-700 dark:text-slate-50 rounded-none  tablet:dark:border-b-slate-700 tablet:border-b-0 tablet:border-l-2  tablet:border-l-[#e6e6e6] tablet:dark:border-l-slate-700   ${slug === '/faq/ticket-refund' && ' text-green-200  tablet:border-l-green-300 tablet:dark:border-l-green-100'}`}
      >
        <Link prefetch={false} href={'/faq/ticket-refund'}>
          {t('ticket_refund')}
        </Link>
      </Button>
    </div>
  );
}
