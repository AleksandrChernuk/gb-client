import { getOrderStatusAndPdf } from '@/actions/orders.actions';
import ThirdFooter from '@/components/modules/footer/ThirdFooter';
import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { CleanOrderData } from './modules/CleanStor';
import { getTranslations } from 'next-intl/server';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { cn } from '@/lib/utils';
import { notFound } from 'next/navigation';
import LoadingPdfBtn from '@/components/shared/LoadingPdfBtn';
import TicketLinkBtn from '@/components/shared/TicketLinkBtn';

interface PaymentResultPageProps {
  payment_id: string;
}

function getPaymentStatusKey(msg?: string): string {
  if (!msg) return 'errors.default';

  switch (msg) {
    case 'Payment is pending':
    case 'BOARDING_PAY':
    case 'Order created':
      return 'errors.default';

    default:
      return `errors.${msg}`;
  }
}

export default async function PaymentResultPage({ payment_id }: PaymentResultPageProps) {
  const resOrder = await getOrderStatusAndPdf(payment_id);

  if (!resOrder) {
    notFound();
  }

  const t = await getTranslations(MESSAGE_FILES.PAYMENT_RESULT_PAGE);

  const { pdf, orderLink, ticketLinks, status, message, orderNumber } = resOrder;
  console.log(resOrder);

  const isSuccess = status !== 'error';

  return (
    <div className="flex flex-col h-svh">
      <CleanOrderData />

      <main role="main" className="grow flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900">
        <section className="py-5">
          <Container size="xs" className="w-full">
            <div className="space-y-6">
              {isSuccess && (
                <>
                  <h1 className="text-xl tablet:text-2xl text-center">
                    {t.rich('order_success', {
                      orderNumber,
                      number: (chunks) => <span className="text-green-300">{chunks}</span>,
                    })}
                  </h1>
                  <h3 className="text-center text-slate-700 dark:text-slate-50 text-lg tablet:text-xl">
                    {t('tickets_sent')}
                  </h3>
                  <div className={cn('grid grid-cols-2 gap-4 justify-center items-center wra')}>
                    {!!pdf && <LoadingPdfBtn pdf={pdf} orderNumber={orderNumber.padStart(9, '0')} />}

                    {(orderLink || ticketLinks?.length) && (
                      <>
                        {orderLink && <TicketLinkBtn href={orderLink} textBtn="e_ticket_link" />}

                        {ticketLinks?.map((ticketLink, index) => (
                          <TicketLinkBtn key={`ticket-${index}`} href={ticketLink} />
                        ))}
                      </>
                    )}
                  </div>
                </>
              )}

              {!isSuccess && (
                <>
                  <h1 className="text-xl tablet:text-2xl text-center">{t('order_error')}</h1>
                  <h3 className="text-center text-red-500 dark:text-red-300 text-lg tablet:text-xl">
                    {t(getPaymentStatusKey(message))}
                  </h3>
                </>
              )}

              <div>
                <Button asChild variant="destructive">
                  <Link href="/" prefetch={false}>
                    {t('go_home')}
                  </Link>
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <ThirdFooter />
    </div>
  );
}
