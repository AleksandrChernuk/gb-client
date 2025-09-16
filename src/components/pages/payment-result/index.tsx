import { getOrderStatusAndPdf } from '@/actions/orders.actions';
import ThirdFooter from '@/components/modules/footer/ThirdFooter';
import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { CleanOrderData } from './modules/CleanStor';
import { getTranslations } from 'next-intl/server';
import { MESSAGE_FILES } from '@/config/message.file.constans';

import { notFound } from 'next/navigation';

import { SuccessPayment } from './modules/SuccessPayment';
import { ErrorPayment } from './modules/ErrorPayment';

interface PaymentResultPageProps {
  payment_id: string;
}

export default async function PaymentResultPage({ payment_id }: PaymentResultPageProps) {
  const resOrder = await getOrderStatusAndPdf(payment_id);

  if (!resOrder) {
    notFound();
  }

  const t = await getTranslations(MESSAGE_FILES.PAYMENT_RESULT_PAGE);

  const { pdf, orderLink, ticketLinks, status, message, orderNumber } = resOrder;

  const isSuccess = status !== 'error';

  return (
    <>
      <CleanOrderData />
      <main role="main" className="flex items-center justify-center flex-1 bg-slate-50 dark:bg-slate-900">
        <section>
          <Container size="xs" className="w-full">
            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-xs space-y-8">
              {isSuccess && (
                <SuccessPayment
                  pdf={pdf}
                  orderLink={orderLink}
                  ticketLinks={ticketLinks}
                  orderNumber={orderNumber.padStart(9, '0')}
                />
              )}

              {!isSuccess && <ErrorPayment message={message} errorHeading="order_error" />}

              <div className="text-left">
                <Button asChild variant="link">
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
    </>
  );
}
