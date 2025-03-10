'use client';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

type Props = {
  slug: string;
};

export default function FaqNav({ slug }: Props) {
  const t = useTranslations('questions_answers');
  return (
    <div className="flex items-start gap-2 overflow-x-scroll tablet:overflow-hidden tablet:gap-0 tablet:flex-col no-scrollbar">
      <Button
        key={'/faq/bronjuvannja-mists'}
        asChild
        variant="link"
        className={`p-2 secondary_text tablet:p-4 tablet:addional_regular_text laptop:filter_input_normal_text text-text_prymery tablet:rounded-none  tablet:dark:border-b-black_2_for_text tablet:border-b-0 tablet:border-l-2  tablet:border-l-gray_0 tablet:dark:border-l-black_2_for_text  ${(slug === '/faq/bronjuvannja-mists' || slug === '/faq') && 'text-primary_1 tablet:border-l-primary_1 tablet:dark:border-l-primary_2'}`}
      >
        <Link href={'/faq/bronjuvannja-mists'}>{t('booking_seats')}</Link>
      </Button>
      <Button
        key={'/faq/routes-and-buses'}
        asChild
        variant="link"
        className={`p-2 secondary_text tablet:p-4 tablet:addional_regular_text laptop:filter_input_normal_text text-text_prymery rounded-none  tablet:dark:border-b-black_2_for_text tablet:border-b-0 tablet:border-l-2  tablet:border-l-gray_0 tablet:dark:border-l-black_2_for_text   ${slug === '/faq/routes-and-buses' && 'text-primary_1  tablet:border-l-primary_1 tablet:dark:border-l-primary_2'}`}
      >
        <Link href={'/faq/routes-and-buses'}>{t('flights_and_buses')}</Link>
      </Button>
      <Button
        key={'/faq/ticket-refund'}
        asChild
        variant="link"
        className={`p-2 secondary_text tablet:p-4 tablet:addional_regular_text laptop:filter_input_normal_text text-text_prymery rounded-none  tablet:dark:border-b-black_2_for_text tablet:border-b-0 tablet:border-l-2  tablet:border-l-gray_0 tablet:dark:border-l-black_2_for_text   ${slug === '/faq/ticket-refund' && ' text-primary_1  tablet:border-l-primary_1 tablet:dark:border-l-primary_2'}`}
      >
        <Link href={'/faq/ticket-refund'}>{t('ticket_refund')}</Link>
      </Button>
    </div>
  );
}
