import LoadingPdfBtn from '@/components/shared/LoadingPdfBtn';
import TicketLinkBtn from '@/components/shared/TicketLinkBtn';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { cn } from '@/lib/utils';
import { getTranslations } from 'next-intl/server';

type Props = {
  pdf: string;
  orderLink: string;
  ticketLinks: string[];
  orderNumber: string;
};

export const SuccessPayment = async ({ pdf, orderLink, ticketLinks, orderNumber }: Props) => {
  const t = await getTranslations(MESSAGE_FILES.PAYMENT_RESULT_PAGE);

  return (
    <div className="text-center space-y-8">
      <h1 className="text-xl tablet:text-2xl text-center">
        {t.rich('order_success', {
          orderNumber,
          number: (chunks) => <span className="text-green-300">{chunks}</span>,
        })}
      </h1>
      <h3 className="text-center text-slate-700 dark:text-slate-50 text-lg tablet:text-xl">{t('tickets_sent')}</h3>
      <div className={cn('flex flex-wrap gap-4 items-center justify-center')}>
        {!!pdf && (
          <div>
            <LoadingPdfBtn pdf={pdf} orderNumber={orderNumber.padStart(9, '0')} />
          </div>
        )}
        {(orderLink || ticketLinks?.length) && (
          <>
            {orderLink && (
              <div>
                <TicketLinkBtn href={orderLink} textBtn="e_ticket_link" />
              </div>
            )}

            {ticketLinks?.map((ticketLink, index) => (
              <div key={`ticket-${index}`}>
                <TicketLinkBtn key={`ticket-${index}`} href={ticketLink} />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
