import { getOrderStatusAndPdf } from '@/actions/orders.actions';
import ThirdFooter from '@/components/modules/footer/ThirdFooter';
import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { CleanOrderData } from './modules/CleanStor';
import { RefreshButton } from './modules/RefreshButton';
import { getTranslations } from 'next-intl/server';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { cn } from '@/lib/utils';
import { notFound } from 'next/navigation';
import LoadingPdfBtn from '@/components/shared/LoadingPdfBtn';
import TicketLinkBtn from '@/components/shared/TicketLinkBtn';

interface PaymentResultPageProps {
  payment_id: string;
}

export default async function PaymentResultPage({ payment_id }: PaymentResultPageProps) {
  const resOrder = await getOrderStatusAndPdf(payment_id);

  if (!resOrder) {
    notFound();
  }

  const t = await getTranslations(MESSAGE_FILES.PAYMENT_RESULT_PAGE);

  const { pdf: pdfBase64, orderLink, ticketLinks, status, message, orderNumber } = resOrder;

  // Определяем состояние заказа
  const isSuccess = status === 'success';
  const isPending = message === 'Payment is pending';
  // const isError = !isSuccess && !isPending;

  // Вычисляем заголовок
  const getTitle = () => {
    if (isSuccess) {
      return t.rich('order_success', {
        orderNumber,
        number: (chunks) => <span className="text-green-300">{chunks}</span>,
      });
    }
    if (isPending) {
      return t('order_pending');
    }
    return t('order_error');
  };

  // Определяем количество колонок в сетке
  const gridCols = orderLink || ticketLinks?.length || isPending ? 'md:grid-cols-2' : '';

  return (
    <div className="flex flex-col h-svh">
      <CleanOrderData />

      <main role="main" className="grow flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900">
        <section className="py-5">
          <Container size="xs" className="w-full">
            <div className="space-y-6">
              {/* Заголовок */}
              <h1 className="text-xl tablet:text-2xl text-center">{getTitle()}</h1>

              {/* Подзаголовок для успешных заказов */}
              {isSuccess && (
                <h3 className="text-center text-slate-700 dark:text-slate-50 text-lg tablet:text-xl">
                  {isPending ? t('ticket_will_appear') : t('tickets_sent')}
                </h3>
              )}

              {/* Сетка с кнопками */}
              <div className={cn('grid grid-cols-1 gap-4 justify-center items-center', gridCols)}>
                {pdfBase64 && <LoadingPdfBtn pdf={pdfBase64} orderNumber={orderNumber.padStart(9, '0')} />}

                {(orderLink || ticketLinks?.length) && (
                  <div className="flex flex-col gap-4">
                    {/* Ссылка на заказ */}
                    {orderLink && <TicketLinkBtn href={orderLink} />}

                    {ticketLinks?.map((ticketLink, index) => (
                      <TicketLinkBtn key={`ticket-${index}`} href={ticketLink} />
                    ))}
                  </div>
                )}

                {isPending && (
                  <div>
                    <RefreshButton />
                  </div>
                )}

                <div>
                  <Button asChild variant="secondary" size="primary" className="text-black">
                    <Link href="/" prefetch={false}>
                      {t('go_home')}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <ThirdFooter />
    </div>
  );
}
